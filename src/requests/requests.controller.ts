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
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { BodyValidationDto } from './dto/create-request-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserWriteAccessGuard } from '../common/guards/user-write-access-guard';
import { RequestIdParamsDto } from './dto/requestId-params.dto';
import { ModerateRequestBodyDto } from './dto/moderate-request-body.dto';
import { GetAllQueryFilterDto } from './dto/get-all-query-params.dto';
import { RequestsReadAccessGuard } from '../common/guards/get-all-requests.guard';
import { AcceptRequestParamsDto } from './dto/accept-request-params.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/User.entity';
import { RequestAccessGuard } from '../common/guards/request-access.guard';
import { GetUserRequestDto } from './dto/get-user-requests.dto';
import { ReportBodyDto } from './dto/report-body.dto';
import { ModerationAdminGuard } from '../common/guards/moderation-admin.guard';
import { Request } from './entities/Request.entity';
import { Paginated } from '../common/interfaces/paginated-entity.interface';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post('requests')
  @ApiTags('Requests')
  @ApiCreatedResponse({ type: Request })
  createRequest(@Body() body: BodyValidationDto): Promise<Request> {
    return this.requestsService.createRequest(body);
  }

  @Get('requests')
  @UseGuards(AuthGuard('jwt'), RequestsReadAccessGuard)
  @ApiBearerAuth()
  @ApiTags('Requests')
  @ApiOkResponse({ type: () => Request })
  getAllRequests(
    @Query() query: GetAllQueryFilterDto,
  ): Promise<Paginated<Request>> {
    return this.requestsService.getAllRequests(query);
  }

  @Get('/volunteers/:volunteerId/requests/:requestId')
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiBearerAuth()
  @ApiTags('Requests')
  @ApiOkResponse({ type: Request })
  getOneRequest(@Param() params: RequestIdParamsDto): Promise<Request> {
    return this.requestsService.getOneRequest(params);
  }

  @Get('/volunteers/me/requests')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiTags('Requests')
  @ApiOkResponse({ type: () => Request })
  getUsersRequest(
    @Query() query: GetUserRequestDto,
    @GetUser() user: User,
  ): Promise<Paginated<Request>> {
    return this.requestsService.getUsersRequest(query, user);
  }

  @Put('/requests/:requestId/accept')
  @ApiTags('Requests')
  @UseGuards(AuthGuard('jwt'), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Request })
  acceptRequest(
    @Param() params: AcceptRequestParamsDto,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestsService.acceptRequest(params, user);
  }

  @Put('/requests/:requestId/decline')
  @ApiTags('Requests')
  @UseGuards(AuthGuard('jwt'), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Request })
  declineRequest(
    @Param() params: RequestIdParamsDto,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestsService.declineRequest(params, user);
  }

  @Put('/requests/:requestId/done')
  @ApiTags('Requests')
  @UseGuards(AuthGuard('jwt'), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Request })
  doneRequest(
    @Param() params: RequestIdParamsDto,
    @GetUser() user: User,
  ): Promise<Request> {
    return this.requestsService.doneRequest(params, user);
  }

  @Put('/requests/:requestId')
  @ApiTags('Requests')
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Request })
  moderateRequest(
    @Param() params: RequestIdParamsDto,
    @Body() body: ModerateRequestBodyDto,
  ): Promise<Request> {
    return this.requestsService.moderateRequest(params, body);
  }

  @Post('/requests/:requestId/report')
  @ApiTags('Requests')
  @UseGuards(AuthGuard('jwt'), RequestAccessGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  reportRequest(
    @Param() params: RequestIdParamsDto,
    @GetUser() user: User,
    @Body() body: ReportBodyDto,
  ) {
    return this.requestsService.reportRequest(params, user, body);
  }
}
