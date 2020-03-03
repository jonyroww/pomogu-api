import { Injectable } from "@nestjs/common";
import { RequestRepository } from "./repositories/Request.repository";
import { ParamsValidationDto } from "./dto/create-request-params.dto";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { BodyValidationDto } from "./dto/create-request-body.dto";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { GetOneRequestParamsDto } from "./dto/get-one-request-params.dto";

@Injectable()
export class RequestsService {
  constructor(
    private requestRepository: RequestRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository
  ) {}

  @Transactional()
  async createRequest(
    { help_type_ids, citizen_type_ids, ...body }: BodyValidationDto,
    params: ParamsValidationDto
  ) {
    const request = this.requestRepository.create(body);
    const helpTypes =
      help_type_ids && help_type_ids.length != 0
        ? await this.helpTypesRepository
            .createQueryBuilder("help_types")
            .where("id IN (:...helpTypesId)", {
              helpTypesId: help_type_ids
            })
            .getMany()
        : [];
    const citezenTypes =
      citizen_type_ids && citizen_type_ids.length != 0
        ? await this.citezenTypesRepository
            .createQueryBuilder("citezen_types")
            .where("id IN (:...citezenTypesId)", {
              citezenTypesId: citizen_type_ids
            })
            .getMany()
        : [];
    request.user_id = params.id;
    request.citezenTypes = citezenTypes;
    request.helpTypes = helpTypes;
    await this.requestRepository.save(request);
    return request;
  }

  async getAllRequests() {
    const requests = await this.requestRepository.find();
    return requests;
  }

  async getOneRequest(params: GetOneRequestParamsDto) {
    const request = await this.requestRepository.findOne({
      id: params.requestId
    });
    return request;
  }
}
