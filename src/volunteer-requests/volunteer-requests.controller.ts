import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { VolunteerRequest } from './entities/Volunteer-request.entity';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { VolunteerRequestBodyDto } from './dto/volunteer-request-body.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from 'src/users/entities/User.entity';
import { VolunteerRequestAuthBodyDto } from './dto/auth-body.dto';
import { VolunteerRequestIdDto } from './dto/volunteer-request-id.dto';
import { ModerationBodyDto } from './dto/moderate-body.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { ModerationAdminGuard } from '../common/guards/moderation-admin.guard';
import { UpdateVolunteerRequestBodyDto } from './dto/update-volunteer-request-body.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('volunteer-requests')
export class VolunteerRequestsController {
  constructor(private volunteerRequestService: VolunteerRequestsService) {}
  @ApiTags('Volunteer Requests')
  @ApiCreatedResponse({ type: VolunteerRequest })
  @Post()
  createVolunteerRequest(@Body() body: VolunteerRequestBodyDto) {
    return this.volunteerRequestService.createVolunteerRequest(body);
  }

  @ApiTags('Volunteer Requests')
  @ApiCreatedResponse({ type: VolunteerRequest })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/auth')
  createVolunteerRequestAuth(
    @Body() body: VolunteerRequestAuthBodyDto,
    @GetUser() user: User,
  ) {
    return this.volunteerRequestService.createVolunteerRequestAuth(body, user);
  }

  @ApiTags('Volunteer Requests')
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @Get()
  getAllVolunteerRequests(@Query() query: GetAllQueryDto) {
    return this.volunteerRequestService.getAllVolunteerRequests(query);
  }

  @ApiTags('Volunteer Requests')
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @Get('/:id')
  getOneVolunteerRequest(@Param() params: VolunteerRequestIdDto) {
    return this.volunteerRequestService.getOneRequest(params);
  }

  @ApiTags('Volunteer Requests')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @Put('/:id/moderate')
  moderateVolunteerRequest(
    @Param() params: VolunteerRequestIdDto,
    @Body() body: ModerationBodyDto,
  ) {
    return this.volunteerRequestService.moderateRequest(params, body);
  }

  @ApiTags('Volunteer Requests')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @Put('/:id')
  updateVolunteerRequest(
    @Param() params: VolunteerRequestIdDto,
    @Body() body: UpdateVolunteerRequestBodyDto,
  ) {
    return this.volunteerRequestService.updateRequest(params, body);
  }

  @ApiTags('Volunteer Requests')
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  deleteVolunteerRequest(@Param() params: VolunteerRequestIdDto) {
    return this.volunteerRequestService.deleteVolunteerRequest(params);
  }
}
