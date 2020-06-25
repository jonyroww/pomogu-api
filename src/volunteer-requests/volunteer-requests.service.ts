import { Injectable } from '@nestjs/common';
import { VolunteerRequest } from './entities/Volunteer-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VolunteerRequestBodyDto } from './dto/volunteer-request-body.dto';
import { makeError } from '../common/errors/index';
import { PurposeType } from 'src/constants/PurposeType.enum';
import { MailerService } from '@nest-modules/mailer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { VolunteerRequestRepository } from './repositories/Volunteer-request.repositories';
import { PhoneVerificationRepository } from '../auth/repository/Phone-verification.repository';
import { HelpTypesRepository } from '../help-types/repositories/Help-types.repository';
import { CitezenTypesRepository } from '../citezen-types/repositories/Citezen-types.repository';
import { OrganisationRepository } from '../organisations/repositories/Organisation.repository';
import { User } from 'src/users/entities/User.entity';
import { VolunteerRequestAuthBodyDto } from './dto/auth-body.dto';
import { VolunteerRequestIdDto } from './dto/volunteer-request-id.dto';
import { ModerationStatus } from 'src/constants/ModerationStatus.enum';
import { ModerationBodyDto } from './dto/moderate-body.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateVolunteerRequestBodyDto } from './dto/update-volunteer-request-body.dto';
import { setTypesFilters } from '../common/utils/types-filters.util';
import { Paginated } from '../common/interfaces/paginated-entity.interface';
import { VolunteerRequestAdminBodyDto } from './dto/admin-body.dto';
import { RoleName } from 'src/constants/RoleName.enum';

@Injectable()
export class VolunteerRequestsService {
  constructor(
    @InjectRepository(VolunteerRequest)
    private volunteerRequestRepository: VolunteerRequestRepository,
    private phoneVerificationRepository: PhoneVerificationRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository,
    private organisationRepository: OrganisationRepository,
    private readonly mailerService: MailerService,
    private authService: AuthService,
  ) {}

  @Transactional()
  async createVolunteerRequest({
    help_type_ids,
    citizen_type_ids,
    organisation_ids,
    ...body
  }: VolunteerRequestBodyDto): Promise<VolunteerRequest> {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id,
    );
    this.authService.checkPhoneVerification(
      phoneVerification,
      body.verification_id,
      body.verification_key,
      PurposeType.NEW_VOLUNTEER_REQUEST,
    );
    await this.isVolunteerRequestNotUnique(phoneVerification.phone, body.email);
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids,
    );
    const organisations = await this.organisationRepository.findByIds(
      organisation_ids,
    );

    const volunteerRequest = this.volunteerRequestRepository.create(body);
    volunteerRequest.helpTypes = helpTypes;
    volunteerRequest.citezenTypes = citezenTypes;
    volunteerRequest.organisations = organisations;
    volunteerRequest.verification_id = body.verification_id;
    volunteerRequest.phone = phoneVerification.phone;
    await this.volunteerRequestRepository.save(volunteerRequest);
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);
    await this.sendEmail(volunteerRequest);
    return volunteerRequest;
  }

  async createVolunteerRequestAuth(
    body: VolunteerRequestAuthBodyDto,
    user: User,
  ): Promise<VolunteerRequest> {
    const helpTypes = await this.helpTypesRepository.findByIds(
      body.help_type_ids,
    );
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      body.citizen_type_ids,
    );
    const organisations = await this.organisationRepository.findByIds(
      body.organisation_ids,
    );
    const volunteerRequest = this.volunteerRequestRepository.create(user);
    volunteerRequest.helpTypes = helpTypes;
    volunteerRequest.citezenTypes = citezenTypes;
    volunteerRequest.organisations = organisations;
    volunteerRequest.user_id = user.id;
    await this.volunteerRequestRepository.save(volunteerRequest);
    await this.sendEmail(volunteerRequest);
    return volunteerRequest;
  }

  async createVolunteerRequestAdmin({
    help_type_ids,
    citizen_type_ids,
    organisation_ids,
    ...body
  }: VolunteerRequestAdminBodyDto): Promise<VolunteerRequest> {
    await this.isVolunteerRequestNotUnique(body.phone, body.email);
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids,
    );
    const organisations = await this.organisationRepository.findByIds(
      organisation_ids,
    );

    const volunteerRequest = this.volunteerRequestRepository.create(body);
    volunteerRequest.helpTypes = helpTypes;
    volunteerRequest.citezenTypes = citezenTypes;
    volunteerRequest.organisations = organisations;
    await this.volunteerRequestRepository.save(volunteerRequest);
    await this.sendEmail(volunteerRequest);
    return volunteerRequest;
  }

  async moderateRequest(
    params: VolunteerRequestIdDto,
    body: ModerationBodyDto,
  ): Promise<VolunteerRequest> {
    const volunteerRequest = await this.volunteerRequestRepository.findOne({
      id: params.id,
    });
    if (volunteerRequest && volunteerRequest.deleted_at === null) {
      volunteerRequest.moderation_status = body.moderation_status;
      await this.volunteerRequestRepository.save(volunteerRequest);
      return volunteerRequest;
    } else {
      throw makeError('RECORD_NOT_FOUND');
    }
  }

  async getAllVolunteerRequests(
    query: GetAllQueryDto,
  ): Promise<Paginated<VolunteerRequest>> {
    const qb = this.volunteerRequestRepository.createQueryBuilder(
      'volunteer_requests',
    );
    qb.leftJoinAndSelect('volunteer_requests.helpTypes', 'helpTypes')
      .leftJoinAndSelect('volunteer_requests.citezenTypes', 'citezenTypes')
      .leftJoinAndSelect('volunteer_requests.organisations', 'organisations');

    setTypesFilters(qb, query.help_type_ids, query.citizen_type_ids);

    qb.andWhere('volunteer_requests.moderation_status = :moderation_status', {
      moderation_status: query.moderation_status || ModerationStatus.APPROVED,
    }).andWhere('volunteer_requests.deleted_at is null');

    const total = await qb.getCount();
    const volunteerRequests = await qb
      .take(query.limit)
      .skip(query.offset)
      .getMany();
    return { total: total, data: volunteerRequests };
  }

  async getOneRequest(
    params: VolunteerRequestIdDto,
  ): Promise<VolunteerRequest> {
    const volunteerRequest = await this.volunteerRequestRepository.findOne({
      id: params.id,
    });

    if (!volunteerRequest || volunteerRequest.deleted_at) {
      throw makeError('RECORD_NOT_FOUND');
    } else {
      return volunteerRequest;
    }
  }

  async updateRequest(
    params: VolunteerRequestIdDto,
    {
      help_type_ids,
      citezen_type_ids,
      organisation_ids,
      ...body
    }: UpdateVolunteerRequestBodyDto,
  ): Promise<VolunteerRequest> {
    const volunteerRequest = await this.volunteerRequestRepository.findOne({
      id: params.id,
      deleted_at: null,
    });
    if (!volunteerRequest) {
      throw makeError('RECORD_NOT_FOUND');
    }
    this.volunteerRequestRepository.merge(volunteerRequest, body);

    if (help_type_ids) {
      const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
      volunteerRequest.helpTypes = helpTypes;
    }

    if (citezen_type_ids) {
      const citizenTypes = await this.citezenTypesRepository.findByIds(
        citezen_type_ids,
      );
      volunteerRequest.citezenTypes = citizenTypes;
    }

    if (organisation_ids) {
      const organisations = await this.organisationRepository.findByIds(
        organisation_ids,
      );
      volunteerRequest.organisations = organisations;
    }
    await this.volunteerRequestRepository.save(volunteerRequest);
    return volunteerRequest;
  }

  async deleteVolunteerRequest(params: VolunteerRequestIdDto) {
    const volunteerRequest = await this.volunteerRequestRepository.findOne({
      id: params.id,
    });

    if (!volunteerRequest) {
      throw makeError('RECORD_NOT_FOUND');
    } else {
      await this.volunteerRequestRepository.softDelete({ id: params.id });
      return;
    }
  }

  async sendEmail(volunteerRequest) {
    if (volunteerRequest.email) {
      await this.mailerService.sendMail({
        to: volunteerRequest.email,
        from: 'socqr@mail.ru',
        subject: 'ЯПомогу - анкета волонтера',
        template: 'pomogu1.html',
        context: {
          firstName: volunteerRequest.first_name,
          middleName: volunteerRequest.middle_name,
          lastName: volunteerRequest.last_name,
          email: volunteerRequest.email,
          phone: volunteerRequest.phone,
          city: volunteerRequest.city,
          comment: volunteerRequest.comment,
          citezenTypes: volunteerRequest.citezenTypes,
          helpTypes: volunteerRequest.helpTypes,
          organisations: volunteerRequest.organisations,
        },
      });
    }
  }

  async isVolunteerRequestNotUnique(phone: string, email: string) {
    const isPhoneNotUnique = await this.volunteerRequestRepository.findOne({
      phone: phone,
    });
    const isEmailNotUnique = await this.volunteerRequestRepository.findOne({
      email: email,
    });
    if (isPhoneNotUnique) {
      throw makeError('PHONE_ALREADY_EXISTS');
    } else if (isEmailNotUnique) {
      throw makeError('EMAIL_ALREADY_EXISTS');
    }
  }
}
