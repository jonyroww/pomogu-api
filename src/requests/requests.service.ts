import { Injectable } from '@nestjs/common';
import { RequestRepository } from './repositories/Request.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { BodyValidationDto } from './dto/create-request-body.dto';
import { HelpTypesRepository } from '../help-types/repositories/Help-types.repository';
import { CitezenTypesRepository } from '../citezen-types/repositories/Citezen-types.repository';
import { RequestIdParamsDto } from './dto/requestId-params.dto';
import { ModerationStatus } from '../constants/ModerationStatus.enum';
import { ModerateRequestBodyDto } from './dto/moderate-request-body.dto';
import { GetAllQueryFilterDto } from './dto/get-all-query-params.dto';
import { RequestStatus } from '../constants/RequestStatus.enum';
import { AcceptRequestParamsDto } from './dto/accept-request-params.dto';
import { User } from '../users/entities/User.entity';
import { makeError } from 'src/common/errors';
import { GetUserRequestDto } from './dto/get-user-requests.dto';
import { ReportBodyDto } from './dto/report-body.dto';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '../config/config.service';
import { UserRepository } from '../users/repositories/User.repository';
import { setTypesFilters } from '../common/utils/types-filters.util';

@Injectable()
export class RequestsService {
  constructor(
    private requestRepository: RequestRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository,
    private readonly mailerService: MailerService,
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  @Transactional()
  async createRequest({
    help_type_ids,
    citizen_type_ids,
    ...body
  }: BodyValidationDto) {
    const request = this.requestRepository.create(body);
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids,
    );
    request.status = RequestStatus.NO_VOLUNTEER;
    request.moderation_status = ModerationStatus.NOT_MODERATED;
    request.citezenTypes = citezenTypes;
    request.helpTypes = helpTypes;
    await this.requestRepository.save(request);
    return request;
  }

  async getAllRequests(query: GetAllQueryFilterDto) {
    const qb = this.requestRepository.createQueryBuilder('requests');

    qb.leftJoinAndSelect('requests.helpTypes', 'helpTypes').leftJoinAndSelect(
      'requests.citezenTypes',
      'citezenTypes',
    );

    setTypesFilters(qb, query.help_type_ids, query.citizen_type_ids);

    /*
    qb.andWhere("requests.moderation_status = :moderation_status", {
      moderation_status: query.moderation_status || ModerationStatus.APPROVED
    }); 
*/
    if (query.city) {
      qb.andWhere('requests.city = :city', { city: query.city });
    }
    qb.andWhere('requests.status = :status', {
      status: RequestStatus.NO_VOLUNTEER,
    }).andWhere('requests.user_id is null');

    const total = await qb.getCount();
    const requests = await qb
      .take(query.limit)
      .skip(query.offset)
      .getMany();

    return { total: total, data: requests };
  }

  async getOneRequest(params: RequestIdParamsDto) {
    const request = await this.requestRepository.findOne({
      id: params.requestId,
    });
    return request;
  }

  async getUsersRequest(query: GetUserRequestDto, user: User) {
    const qb = this.requestRepository.createQueryBuilder('requests');
    qb.where('requests.user_id = :user_id', {
      user_id: user.id,
    }).andWhere('requests.status = :status', {
      status: query.status,
    });

    const total = await qb.getCount();
    const requests = await qb
      .take(query.limit)
      .skip(query.offset)
      .getMany();

    return { total: total, data: requests };
  }

  async acceptRequest(params: AcceptRequestParamsDto, user: User) {
    const request = await this.requestRepository.findOne({
      id: params.requestId,
    });
    if (!request) {
      throw makeError('RECORD_NOT_FOUND');
    }
    if (request.status === RequestStatus.NO_VOLUNTEER) {
      request.status = RequestStatus.IN_PROGRESS;
      request.user_id = user.id;
    } else {
      throw makeError('REQUEST_ALREADY_IN_PROGRESS');
    }
    await this.requestRepository.save(request);
    return request;
  }

  async declineRequest(params: RequestIdParamsDto, user: User) {
    const request = await this.requestRepository.findOne({
      id: params.requestId,
    });
    if (!request) {
      throw makeError('RECORD_NOT_FOUND');
    }
    if (request.user_id != user.id) {
      throw makeError('FORBIDDEN');
    }
    if (request.status === RequestStatus.IN_PROGRESS) {
      request.status = RequestStatus.NO_VOLUNTEER;
      request.user_id = null;
    } else {
      throw makeError('REQUEST_MUST_BE_IN_PROGRESS');
    }
    await this.requestRepository.save(request);
    return request;
  }

  async doneRequest(params: RequestIdParamsDto, user: User) {
    const request = await this.requestRepository.findOne({
      id: params.requestId,
    });
    if (!request) {
      throw makeError('RECORD_NOT_FOUND');
    }
    if (request.user_id != user.id) {
      throw makeError('FORBIDDEN');
    }
    if (request.status === RequestStatus.IN_PROGRESS) {
      request.status = RequestStatus.DONE;
      user.help_count += 1;
      await this.userRepository.save(user);
      await this.requestRepository.save(request);
    } else {
      throw makeError('REQUEST_MUST_BE_IN_PROGRESS');
    }
    return request;
  }

  async moderateRequest(
    params: RequestIdParamsDto,
    body: ModerateRequestBodyDto,
  ) {
    const request = await this.requestRepository.findOne({
      id: params.requestId,
    });
    if (!request) {
      throw makeError('RECORD_NOT_FOUND');
    }
    request.moderation_status = body.moderation_status;
    await this.requestRepository.save(request);
    return request;
  }

  async reportRequest(
    params: RequestIdParamsDto,
    user: User,
    body: ReportBodyDto,
  ) {
    const request = await this.requestRepository.findOne({
      id: params.requestId,
    });
    if (!request) {
      throw makeError('RECORD_NOT_FOUND');
    }
    await this.sendEmail(user, body.text, request);
    return;
  }

  async sendEmail(user, text, request) {
    if (user.email) {
      await this.mailerService.sendMail({
        to: this.configService.get('SUPPORT_EMAIL'),
        subject: `Жалоба на заявку №${request.id}_${new Date()}`,
        template: 'report.html',
        context: {
          comment: request.comment,
          middleName: request.middle_name,
          firstName: request.first_name,
          lastName: request.last_name,
          email: request.email,
          phone: request.phone,
          created_at: request.created_at,
          text: text,
          middleNameUser: user.middle_name,
          firstNameUser: user.first_name,
          lastNameUser: user.last_name,
          emailUser: user.email,
          phoneUser: user.phone,
        },
      });
    }
  }
}
