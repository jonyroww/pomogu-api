import { Injectable } from "@nestjs/common";
import { RequestRepository } from "./repositories/Request.repository";
import { ParamsValidationDto } from "./dto/create-request-params.dto";
import { BodyValidationDto } from "./dto/create-request-body.dto";

@Injectable()
export class RequestsService {
  constructor(private requestRepository: RequestRepository) {}

  createRequest(body: BodyValidationDto, params: ParamsValidationDto) {}
}
