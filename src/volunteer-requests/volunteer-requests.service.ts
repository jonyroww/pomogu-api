import { Injectable } from '@nestjs/common';
import { VolunteerRequest } from './entities/Volunteer-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VolunteerRequestBodyDto } from './dto/volunteer-request-body.dto';
import { makeError } from '../common/errors/index';
import { PurposeType } from 'src/constants/PurposeType.enum';
import { MailerService } from '@nest-modules/mailer';
import {
  Transactional,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
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
import _ from 'lodash';
import { UpdateVolunteerRequestBodyDto } from './dto/update-volunteer-request-body.dto';

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
  }: VolunteerRequestBodyDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id,
    );
    this.authService.checkPhoneVerification(
      phoneVerification,
      body.verification_id,
      body.verification_key,
      PurposeType.NEW_VOLUNTEER_REQUEST,
    );

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
  ) {
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

  async moderateRequest(
    params: VolunteerRequestIdDto,
    body: ModerationBodyDto,
  ) {
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

  async getAllVolunteerRequests(query: GetAllQueryDto) {
    const qb = this.volunteerRequestRepository.createQueryBuilder(
      'volunteer_requests',
    );
    qb.leftJoinAndSelect(
      'volunteer_requests.helpTypes',
      'helpTypes',
    ).leftJoinAndSelect('volunteer_requests.citezenTypes', 'citezenTypes');

    if (!_.isEmpty(query.help_type_ids) || !_.isEmpty(query.citizen_type_ids)) {
      qb.where('FALSE');
    }

    if (!_.isEmpty(query.help_type_ids)) {
      qb.leftJoin(
        'volunteer_requests.helpTypes',
        'volunteer_requests_help_types',
      ).orWhere('volunteer_requests_help_types.id IN (:...helpTypesId)', {
        helpTypesId: query.help_type_ids,
      });
    }

    if (!_.isEmpty(query.citizen_type_ids)) {
      qb.leftJoin(
        'volunteer_requests.citezenTypes',
        'volunteer_requests_citezen_types',
      ).orWhere('volunteer_requests_citezen_types.id IN (:...citezenTypes)', {
        citezenTypes: query.citizen_type_ids,
      });
    }

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

  async getOneRequest(params: VolunteerRequestIdDto) {
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
      citizen_type_ids,
      organisation_ids,
      ...body
    }: UpdateVolunteerRequestBodyDto,
  ) {
    const volunteerRequest = await this.volunteerRequestRepository.findOne({
      id: params.id,
      deleted_at: null,
    });
    if (!volunteerRequest) {
      throw makeError('RECORD_NOT_FOUND');
    }
    const mergeRequest = this.volunteerRequestRepository.merge(
      volunteerRequest,
      body,
    );

    if (help_type_ids) {
      const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
      mergeRequest.helpTypes = helpTypes;
    }

    if (citizen_type_ids) {
      const citizenTypes = await this.citezenTypesRepository.findByIds(
        citizen_type_ids,
      );
      mergeRequest.citezenTypes = citizenTypes;
    }

    if (organisation_ids) {
      const organisations = await this.organisationRepository.findByIds(
        organisation_ids,
      );
      mergeRequest.organisations = organisations;
    }
    await this.volunteerRequestRepository.save(mergeRequest);
    return mergeRequest;
  }

  async deleteVolunteerRequest(params: VolunteerRequestIdDto) {
    const volunteerRequest = await this.volunteerRequestRepository.findOne({
      id: params.id,
    });

    if (!volunteerRequest || volunteerRequest.deleted_at) {
      throw makeError('RECORD_NOT_FOUND');
    } else {
      volunteerRequest.deleted_at = new Date();
      await this.volunteerRequestRepository.save(volunteerRequest);
      return volunteerRequest;
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
}
