import { Injectable } from "@nestjs/common";
import { RequestRepository } from "./repositories/Request.repository";
import { ParamsValidationDto } from "./dto/create-request-params.dto";
import { BodyValidationDto } from "./dto/create-request-body.dto";

@Injectable()
export class RequestsService {
  constructor(private requestRepository: RequestRepository) {}

  async createRequest(
    { help_type_ids, citizen_type_ids, ...body }: BodyValidationDto,
    params: ParamsValidationDto
  ) {
    const request = this.requestRepository.create(body);
    request.user_id = params.id;
    await this.requestRepository.save(request);
    return request;
  }
}
