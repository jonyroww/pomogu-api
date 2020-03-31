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
import { BodyValidationDto } from "./dto/create-request-body.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserWriteAccessGuard } from "../common/guards/user-write-access-guard";
import { RequestIdParamsDto } from "./dto/requestId-params.dto";
import { IsAdminGuard } from "../common/guards/is-admin.guard";
import { ModerateRequestBodyDto } from "./dto/moderate-request-body.dto";
import { GetAllQueryFilterDto } from "./dto/get-all-query-params.dto";
import { RequestsReadAccessGuard } from "../common/guards/get-all-requests.guard";
import { AcceptRequestParamsDto } from "./dto/accept-request-params.dto";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../users/entities/User.entity";
import { RequestAccessGuard } from "../common/guards/request-access.guard";
import { GetUserRequestDto } from "./dto/get-user-requests.dto";
import { ReportBodyDto } from "./dto/report-body.dto";
import { ModerationAdminGuard } from "../common/guards/moderation-admin.guard";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post("requests")
  @ApiTags("Requests")
  @ApiCreatedResponse()
  createRequest(@Body() body: BodyValidationDto) {
    return this.requestsService.createRequest(body);
  }

  @Get("requests")
  @UseGuards(AuthGuard("jwt"), RequestsReadAccessGuard)
  @ApiBearerAuth()
  @ApiTags("Requests")
  @ApiOkResponse()
  getAllRequests(@Query() query: GetAllQueryFilterDto) {
    return this.requestsService.getAllRequests(query);
  }

  @Get("/volunteers/:volunteerId/requests/:requestId")
  @UseGuards(AuthGuard("jwt"), UserWriteAccessGuard)
  @ApiBearerAuth()
  @ApiTags("Requests")
  @ApiOkResponse()
  getOneRequest(@Param() params: RequestIdParamsDto) {
    return this.requestsService.getOneRequest(params);
  }

  @Get("/volunteers/me/requests")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiTags("Requests")
  @ApiOkResponse()
  getUsersRequest(@Query() query: GetUserRequestDto, @GetUser() user: User) {
    return this.requestsService.getUsersRequest(query, user);
  }

  @Put("/requests/:requestId/accept")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  acceptRequest(
    @Param() params: AcceptRequestParamsDto,
    @GetUser() user: User
  ) {
    return this.requestsService.acceptRequest(params, user);
  }

  @Put("/requests/:requestId/decline")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  declineRequest(@Param() params: RequestIdParamsDto, @GetUser() user: User) {
    return this.requestsService.declineRequest(params, user);
  }

  @Put("/requests/:requestId/done")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  doneRequest(@Param() params: RequestIdParamsDto, @GetUser() user: User) {
    return this.requestsService.doneRequest(params, user);
  }

  @Put("/requests/:requestId")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), ModerationAdminGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  moderateRequest(
    @Param() params: RequestIdParamsDto,
    @Body() body: ModerateRequestBodyDto
  ) {
    return this.requestsService.moderateRequest(params, body);
  }

  @Post("/requests/:requestId/report")
  @ApiTags("Requests")
  @UseGuards(AuthGuard("jwt"), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  reportRequest(
    @Param() params: RequestIdParamsDto,
    @GetUser() user: User,
    @Body() body: ReportBodyDto
  ) {
    return this.requestsService.reportRequest(params, user, body);
  }
}
