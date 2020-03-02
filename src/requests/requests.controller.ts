import {
  Controller,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Post
} from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { RequestsService } from "./requests.service";
import { ParamsValidationDto } from "./dto/create-request-params.dto";
import { BodyValidationDto } from "./dto/create-request-body.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("volunteers/:id/requests")
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post()
  @ApiTags("Requests")
  @ApiCreatedResponse()
  createRequest(
    @Body() body: BodyValidationDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.requestsService.createRequest(body, params);
  }
}
