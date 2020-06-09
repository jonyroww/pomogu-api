import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerification } from './entities/Phone-verification.entity';
import cryptoRandomString from 'crypto-random-string';
import { PhoneVerificationRequestDto } from './dto/phone-verification-request.dto';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { VerificationResendDto } from './dto/verification-resend.dto';
import { ParamsValidationDto } from './dto/params-validation.dto';
import { makeError } from '../common/errors/index';
import { RegistrationBodyDto } from './dto/registration-body.dto';
import { PurposeType } from '../constants/PurposeType.enum';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { PhoneVerificationRepository } from './repository/Phone-verification.repository';
import { UserRepository } from '../users/repositories/User.repository';
import { ConfigService } from '../config/config.service';
import { IJwtPayload } from './interfaces/JwtPayload.interface';
import { User } from '../users/entities/User.entity';
import { OrganisationRepository } from '../organisations/repositories/Organisation.repository';
import { HelpTypesRepository } from '../help-types/repositories/Help-types.repository';
import { CitezenTypesRepository } from '../citezen-types/repositories/Citezen-types.repository';
import axios from 'axios';
import { RoleName } from '../constants/RoleName.enum';
import { ModerationStatus } from '../constants/ModerationStatus.enum';
import { PasswordResetDto } from '../auth/dto/password-reset.dto';
import { OrganisationAdminRegistrationDto } from './dto/organisation-admin-registration.dto';
import { OrganisationPhoneNumberRepository } from '../organisations/repositories/OrganisationPhoneNumbers.repository';
import { OrganisationWebsiteRepository } from '../organisations/repositories/OrganisationWebsite.repository';
import { createWebsites } from '../common/utils/create-organisation-websites.util';
import { createPhoneNumbers } from '../common/utils/create-organisation-phone-numbers.util';
import { checkPhoneVerification } from '../common/utils/check-phone-verification.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PhoneVerification)
    private phoneVerificationRepository: PhoneVerificationRepository,
    private userRepository: UserRepository,
    private organisationRepository: OrganisationRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private organisationPhoneNumberRepository: OrganisationPhoneNumberRepository,
    private organisationWebsiteRepository: OrganisationWebsiteRepository,
  ) {}
  @Transactional()
  async createPhoneVerification(body: PhoneVerificationRequestDto) {
    const phoneVerificationRequest = this.phoneVerificationRepository.create(
      body,
    );
    const user = await this.userRepository.findOne({ phone: body.phone });
    if (body.purpose === PurposeType.REGISTRATION && user && !user.deleted_at) {
      throw makeError('PHONE_ALREADY_EXISTS');
    }
    if (body.purpose === PurposeType.PASSWORD_RESET && !user) {
      throw makeError('USER_NOT_FOUND');
    }
    phoneVerificationRequest.key = cryptoRandomString({ length: 32 });

    const smsCode = this.configService.get('SMS_CODE_GEN')
      ? cryptoRandomString({ length: 6, type: 'numeric' })
      : '111111';

    if (this.configService.get('SMS_CODE_GEN')) {
      await axios.get(
        `https://sms.ru/sms/send?api_id=${this.configService.get(
          'SMS_API_ID',
        )}&to=${phoneVerificationRequest.phone}&msg=${smsCode}`,
      );
    }

    phoneVerificationRequest.sms_code = smsCode;
    phoneVerificationRequest.sms_sent_count = 1;
    phoneVerificationRequest.sms_last_sent_at = new Date();
    phoneVerificationRequest.purpose = body.purpose;
    await this.phoneVerificationRepository.save(phoneVerificationRequest);
    return {
      id: phoneVerificationRequest.id,
      key: phoneVerificationRequest.key,
    };
  }

  @Transactional()
  async verificationPhone(
    body: VerificationPhoneDto,
    params: ParamsValidationDto,
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      params.id,
    );

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (body.key != phoneVerification.key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success !== false) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    } else if (phoneVerification.wrong_attempts_count > 5) {
      throw makeError('MAX_LIMIT_OF_WRONG_ATTEMPTS');
    }

    if (phoneVerification.sms_code != body.sms_code) {
      phoneVerification.wrong_attempts_count += 1;
      await this.phoneVerificationRepository.save(phoneVerification);
      throw makeError('SMS_CODE_IS_NOT_CORRECT');
    } else {
      phoneVerification.success = true;
      await this.phoneVerificationRepository.save(phoneVerification);
    }

    return phoneVerification;
  }

  @Transactional()
  async verificationPhoneResend(
    body: VerificationResendDto,
    params: ParamsValidationDto,
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      params.id,
    );

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (body.key != phoneVerification.key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success === true) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    } else if (phoneVerification.sms_sent_count > 5) {
      throw makeError('LIMIT_EXCEEDED');
    }
    const interval = Date.now() - phoneVerification.sms_last_sent_at.getTime();
    if (interval < 2 * 60 * 1000) {
      throw makeError('TIME_INTERVAL_IS_NOT_OVER');
    }

    const smsCode = this.configService.get('SMS_CODE_GEN')
      ? cryptoRandomString({ length: 6, type: 'numeric' })
      : '111111';

    if (this.configService.get('SMS_CODE_GEN')) {
      await axios.get(
        `https://sms.ru/sms/send?api_id=${this.configService.get(
          'SMS_API_ID',
        )}&to=${phoneVerification.phone}&msg=${smsCode}`,
      );
    }
    phoneVerification.sms_code = smsCode;
    phoneVerification.sms_sent_count += 1;
    phoneVerification.wrong_attempts_count = 0;
    phoneVerification.sms_last_sent_at = new Date();
    await this.phoneVerificationRepository.save(phoneVerification);

    return phoneVerification;
  }

  @Transactional()
  async registrationUser({
    help_type_ids,
    citizen_type_ids,
    organisation_ids,
    verification_id,
    verification_key,
    ...body
  }: RegistrationBodyDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      verification_id,
    );
    checkPhoneVerification(
      phoneVerification,
      verification_id,
      verification_key,
      PurposeType.REGISTRATION,
    );
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids,
    );
    const organisations = await this.organisationRepository.findByIds(
      organisation_ids,
    );
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    const user = this.userRepository.create(body);
    const isPhoneUnique = await this.userRepository.findOne({
      phone: phoneVerification.phone,
    });
    const isEmailUnique = await this.userRepository.findOne({
      email: body.email,
    });
    if (isPhoneUnique && !isPhoneUnique.deleted_at) {
      throw makeError('PHONE_ALREADY_EXISTS');
    } else if (isEmailUnique && !isEmailUnique.deleted_at) {
      throw makeError('EMAIL_ALREADY_EXISTS');
    }
    user.role = RoleName.VOLUNTEER;
    user.phone = phoneVerification.phone;
    user.citezenTypes = citezenTypes;
    user.helpTypes = helpTypes;
    user.organisations = organisations;
    user.moderation_status = ModerationStatus.NOT_MODERATED;
    await this.userRepository.save(user);
    phoneVerification.user_id = user.id;
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);

    const token = await this.jwtService.signAsync({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    });
    return { token: token };
  }

  @Transactional()
  async registrationOrganisationAdmin({
    verification_id,
    verification_key,
    password,
    websites,
    phone_numbers,
    citizen_type_ids,
    help_type_ids,
    ...body
  }: OrganisationAdminRegistrationDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      verification_id,
    );
    checkPhoneVerification(
      phoneVerification,
      verification_id,
      verification_key,
      PurposeType.REGISTRATION,
    );
    const organisation = this.organisationRepository.create(body);

    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids,
    );

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    const user = this.userRepository.create(body);
    const isPhoneUnique = await this.userRepository.findOne({
      phone: phoneVerification.phone,
    });
    const isEmailUnique = await this.userRepository.findOne({
      email: body.email,
    });
    if (isPhoneUnique && !isPhoneUnique.deleted_at) {
      throw makeError('PHONE_ALREADY_EXISTS');
    } else if (isEmailUnique && !isEmailUnique.deleted_at) {
      throw makeError('EMAIL_ALREADY_EXISTS');
    }
    user.role = RoleName.ORGANISTATION_ADMIN;
    user.password = password;
    user.phone = phoneVerification.phone;
    user.citezenTypes = citezenTypes;
    user.helpTypes = helpTypes;
    user.moderation_status = ModerationStatus.NOT_MODERATED;
    await this.userRepository.save(user);

    organisation.owner_id = user.id;
    await this.organisationRepository.save(organisation);
    createWebsites(websites, organisation, this.organisationWebsiteRepository);
    createPhoneNumbers(
      phone_numbers,
      organisation,
      this.organisationPhoneNumberRepository,
    );
    phoneVerification.user_id = user.id;
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);

    const token = await this.jwtService.signAsync({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    });
    return { token: token };
  }

  async validateUser(phone: string, password: string) {
    const user = await this.userRepository.findOne({
      phone: phone,
      deleted_at: null,
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      } else {
        throw makeError('WRONG_PASSWORD');
      }
    } else {
      throw makeError('USER_NOT_FOUND');
    }
  }

  async userLogin(user: User) {
    const payload: IJwtPayload = {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  @Transactional()
  async passwordReset(body: PasswordResetDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id,
    );
    checkPhoneVerification(
      phoneVerification,
      body.verification_id,
      body.verification_key,
      PurposeType.PASSWORD_RESET,
    );
    const user = await this.userRepository.findOne({
      phone: phoneVerification.phone,
    });
    if (!user) {
      throw makeError('USER_NOT_FOUND');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    phoneVerification.user_id = user.id;
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);
    return;
  }
}
