import { Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/User.repository';
import { HelpTypesRepository } from '../help-types/repositories/Help-types.repository';
import { CitezenTypesRepository } from '../citezen-types/repositories/Citezen-types.repository';
import { OrganisationRepository } from '../organisations/repositories/Organisation.repository';
import { makeError } from '../common/errors/index';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { UserIdDto } from './dto/user-id.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ModerationStatus } from '../constants/ModerationStatus.enum';
import { UpdateUserDto } from './dto/update-user-dto';
import bcrypt from 'bcrypt';
import { ModerationBodyDto } from './dto/moderation-body.dto';
import { PhoneVerificationRepository } from '../auth/repository/Phone-verification.repository';
import { PurposeType } from 'src/constants/PurposeType.enum';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { RoleName } from '../constants/RoleName.enum';
import { UpdateUserParamsDto } from './dto/update-phone-params.dto';
import { MailerService } from '@nest-modules/mailer';
import cryptoRandomString from 'crypto-random-string';
import { Paginated } from '../common/interfaces/paginated-entity.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository,
    private phoneVerificationRepository: PhoneVerificationRepository,
    private organisationRepository: OrganisationRepository,
    private mailerService: MailerService,
  ) {}

  @Transactional()
  async findAll(query: GetAllQueryDto): Promise<Paginated<User>> {
    const qb = this.userRepository.createQueryBuilder('users');

    qb.leftJoinAndSelect('users.helpTypes', 'helpTypes')
      .leftJoinAndSelect('users.citezenTypes', 'citezenTypes')
      .leftJoinAndSelect('users.organisations', 'organisations');
    qb.where('users.moderation_status = :moderation_status', {
      moderation_status: query.moderation_status || ModerationStatus.APPROVED,
    });

    qb.andWhere('users.role = :role', {
      role: query.role || RoleName.VOLUNTEER,
    });
    qb.andWhere('users.deleted_at is null');

    const total = await qb.getCount();
    const users = await qb
      .take(query.limit)
      .skip(query.offset)
      .getMany();

    return { total: total, data: users };
  }

  async findOne(params: UserIdDto): Promise<User> {
    const user = await this.userRepository.findOne({
      id: params.id,
      deleted_at: null,
    });
    if (!user) {
      throw makeError('USER_NOT_FOUND');
    }
    return user;
  }

  async createUser({
    organisation_ids,
    citizen_type_ids,
    help_type_ids,
    ...body
  }: CreateUserDto): Promise<User> {
    const phoneExists = await this.userRepository.findOne({
      phone: body.phone,
    });
    const emailExists = await this.userRepository.findOne({
      email: body.email,
    });
    if (emailExists) {
      throw makeError('EMAIL_ALREADY_EXISTS');
    }
    if (phoneExists) {
      throw makeError('PHONE_ALREADY_EXISTS');
    }
    const user = this.userRepository.create(body);
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids,
    );
    const organisations = await this.organisationRepository.findByIds(
      organisation_ids,
    );
    const password = cryptoRandomString({ length: 10, type: 'base64' });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.helpTypes = helpTypes;
    user.citezenTypes = citezenTypes;
    user.organisations = organisations;
    user.moderation_status = ModerationStatus.APPROVED;
    await this.sendPassword(user.email, password);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(
    params: UserIdDto,
    {
      citezen_type_ids,
      organisation_ids,
      help_type_ids,
      ...body
    }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      id: params.id,
      deleted_at: null,
    });
    if (!user) {
      throw makeError('USER_NOT_FOUND');
    }
    const megreUser = this.userRepository.merge(user, body);

    if (help_type_ids) {
      const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
      megreUser.helpTypes = helpTypes;
    }
    if (citezen_type_ids) {
      const citezenTypes = await this.citezenTypesRepository.findByIds(
        citezen_type_ids,
      );
      megreUser.citezenTypes = citezenTypes;
    }
    if (organisation_ids) {
      const organisations = await this.organisationRepository.findByIds(
        organisation_ids,
      );
      megreUser.organisations = organisations;
    }

    await this.userRepository.save(megreUser);
    return megreUser;
  }

  @Transactional()
  async updatePhoneNumber(
    body: UpdatePhoneNumberDto,
    user: User,
    params: UpdateUserParamsDto,
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id,
    );
    if (user.role != RoleName.ADMIN) {
      if (!phoneVerification) {
        throw makeError('RECORD_NOT_FOUND');
      } else if (phoneVerification.purpose != PurposeType.PHONE_NUMBER_UPDATE) {
        throw makeError('PURPOSE_IS_NOT_CORRECT');
      } else if (body.verification_id !== phoneVerification.id) {
        throw makeError('VERIFICATION_ID_IS_NOT_VALID');
      } else if (phoneVerification.key != body.verification_key) {
        throw makeError('KEY_IS_NOT_VALID');
      } else if (phoneVerification.success !== true) {
        throw makeError('CODE_ALREADY_USED');
      } else if (phoneVerification.used === true) {
        throw makeError('VERIFICATION_ALREADY_USED');
      }
    }

    const userDb = await this.userRepository.findOne({
      id: params.volunteerId,
    });
    if (!userDb || userDb.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }

    userDb.phone = body.phone;
    await this.userRepository.save(userDb);
    if (user.role != RoleName.ADMIN) {
      phoneVerification.user_id = userDb.id;
      phoneVerification.used = true;
      await this.phoneVerificationRepository.save(phoneVerification);
    }
    return;
  }

  async deleteUser(params: UserIdDto) {
    const user = await this.userRepository.findOne({
      id: params.id,
      deleted_at: null,
    });
    if (!user) {
      throw makeError('USER_NOT_FOUND');
    } else {
      user.deleted_at = new Date();
      await this.userRepository.save(user);
      return;
    }
  }

  async moderateUser(
    params: UserIdDto,
    body: ModerationBodyDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      id: params.id,
      deleted_at: null,
    });
    if (!user) {
      throw makeError('USER_NOT_FOUND');
    } else {
      user.moderation_status = body.moderation_status;
      await this.userRepository.save(user);
      return user;
    }
  }

  async sendPassword(email, password) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'ЯПомогу - пароль от личного кабинета',
      template: 'password.html',
      context: {
        password: password,
      },
    });
  }
}
