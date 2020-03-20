import { Injectable } from "@nestjs/common";
import { RequestRepository } from "./repositories/Request.repository";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { BodyValidationDto } from "./dto/create-request-body.dto";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { RequestIdParamsDto } from "./dto/requestId-params.dto";
import { ModerationStatus } from "../constants/ModerationStatus.enum";
import { ModerateRequestBodyDto } from "./dto/moderate-request-body.dto";
import { GetAllQueryFilterDto } from "./dto/get-all-query-params.dto";
import _ from "lodash";
import { RequestStatus } from "../constants/RequestStatus.enum";
import { AcceptRequestParamsDto } from "./dto/accept-request-params.dto";
import { User } from "../users/entities/User.entity";
import { makeError } from "src/common/errors";
import { GetUserRequestDto } from "./dto/get-user-requests.dto";

@Injectable()
export class RequestsService {
  constructor(
    private requestRepository: RequestRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository
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
      citizen_type_ids
    );
    request.status = RequestStatus.NO_VOLUNTEER;
    request.moderation_status = ModerationStatus.NOT_MODERATED;
    request.citezenTypes = citezenTypes;
    request.helpTypes = helpTypes;
    await this.requestRepository.save(request);
    return request;
  }

  async getAllRequests(query: GetAllQueryFilterDto) {
    const qb = this.requestRepository.createQueryBuilder("requests");

    qb.leftJoinAndSelect("requests.helpTypes", "helpTypes").leftJoinAndSelect(
      "requests.citezenTypes",
      "citezenTypes"
    );

    if (!_.isEmpty(query.help_type_ids) || !_.isEmpty(query.citizen_type_ids)) {
      qb.where("FALSE");
    }

    if (!_.isEmpty(query.help_type_ids)) {
      qb.leftJoin("requests.helpTypes", "requests_help_types").orWhere(
        "requests_help_types.id IN (:...helpTypesId)",
        {
          helpTypesId: query.help_type_ids
        }
      );
    }

    if (!_.isEmpty(query.citizen_type_ids)) {
      qb.leftJoin("requests.citezenTypes", "requests_citezen_types").orWhere(
        "requests_citezen_types.id IN (:...citezenTypes)",
        {
          citezenTypes: query.citizen_type_ids
        }
      );
    }

    qb.andWhere("requests.moderation_status = :moderation_status", {
      moderation_status: query.moderation_status || ModerationStatus.APPROVED
    });

    qb.andWhere("requests.status = :status", {
      status: RequestStatus.NO_VOLUNTEER
    }).andWhere("requests.user_id is null");

    const total = await qb.getCount();
    const requests = await qb
      .take(query.limit)
      .skip(query.offset)
      .getMany();

    return { total: total, data: requests };
  }

  async getOneRequest(params: RequestIdParamsDto) {
    const request = await this.requestRepository.findOne({
      id: params.requestId
    });
    return request;
  }

  async getUsersRequest(query: GetUserRequestDto, user: User) {
    const requests = await this.requestRepository.find({
      where: { user_id: user.id, status: query.status }
    });

    return requests;
  }

  async acceptRequest(params: AcceptRequestParamsDto, user: User) {
    const request = await this.requestRepository.findOne({
      id: params.requestId
    });
    if (request.status === RequestStatus.NO_VOLUNTEER) {
      request.status = RequestStatus.IN_PROGRESS;
      request.user_id = user.id;
    } else {
      throw makeError("REQUEST_ALREADY_IN_PROGRESS");
    }
    await this.requestRepository.save(request);
    return request;
  }

  async declineRequest(params: RequestIdParamsDto, user: User) {
    const request = await this.requestRepository.findOne({
      id: params.requestId
    });
    if (request.user_id != user.id) {
      throw makeError("FORBIDDEN");
    }
    if (request.status === RequestStatus.IN_PROGRESS) {
      request.status = RequestStatus.NO_VOLUNTEER;
      request.user_id = null;
    } else {
      throw makeError("REQUEST_MUST_BE_IN_PROGRESS");
    }
    await this.requestRepository.save(request);
    return request;
  }

  async moderateRequest(
    params: RequestIdParamsDto,
    body: ModerateRequestBodyDto
  ) {
    const request = await this.requestRepository.findOne({
      id: params.requestId
    });
    request.moderation_status = body.moderation_status;
    await this.requestRepository.save(request);
    return request;
  }
}
