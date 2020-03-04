import {
  Controller,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Post,
  Get,
  UseGuards,
  Put,
  Query
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { RequestsService } from "./requests.service";
import { ParamsValidationDto } from "./dto/create-request-params.dto";
import { BodyValidationDto } from "./dto/create-request-body.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestsReadAccessGuard } from "../common/guards/get-all-requests.guard";
import { RequestIdParamsDto } from "./dto/requestId-params.dto";
import { ModerateRequestGuard } from "../common/guards/moderate-request.guard";
import { ModerateRequestBodyDto } from "./dto/moderate-request-body.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("volunteers")
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post(":id/requests")
  @ApiTags("Requests")
  @ApiCreatedResponse()
  createRequest(
    @Body() body: BodyValidationDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.requestsService.createRequest(body, params);
  }

  @Get(":id/requests")
  @UseGuards(AuthGuard("jwt"), RequestsReadAccessGuard)
  @ApiBearerAuth()
  @ApiTags("Requests")
  @ApiOkResponse()
  getAllRequests() {
    return this.requestsService.getAllRequests();
  }

  @Get(":id/requests/:requestId")
  @UseGuards(AuthGuard("jwt"), RequestsReadAccessGuard)
  @ApiBearerAuth()
  @ApiTags("Requests")
  @ApiOkResponse()
  getOneRequest(@Param() params: RequestIdParamsDto) {
    return this.requestsService.getOneRequest(params);
  }

  @Get("all/requests")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), ModerateRequestGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  getNotModeratedRequests() {
    return this.requestsService.getNotModeratedRequests();
  }

  @Put("all/requests/:requestId")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), ModerateRequestGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  moderateRequest(
    @Param() params: RequestIdParamsDto,
    @Body() body: ModerateRequestBodyDto
  ) {
    return this.requestsService.moderateRequest(params, body);
  }
}
