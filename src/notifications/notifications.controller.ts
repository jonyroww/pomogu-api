import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Notification } from './entities/Notification.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { NotificationsService } from './notifications.service';
import { NotificationBodyDto } from './dto/notification-body.dto';
import { NotificationUpdateBodyDto } from './dto/notification-update-body.dto';
import { NotificationSetReadParamsDto } from './dto/notification-set-read-params.dto';
import { GetNotificationsFiltersDto } from './dto/get-notifications-filter.dto';
import { NotificationIdDto } from './dto/notification-id.dto';
import { VolunteerIdDto } from './dto/volunteer-id.dto';
import { User } from 'src/users/entities/User.entity';
import { UserWriteAccessGuard } from 'src/common/guards/user-write-access-guard';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('notifications')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiTags('Notifications')
  @ApiCreatedResponse({ type: Notification })
  createUser(@Body() body: NotificationBodyDto): Promise<Notification> {
    return this.notificationsService.createNotification(body);
  }

  @Get('/volunteers/:volunteerId/notifications')
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiBearerAuth()
  @ApiTags('Notifications')
  @ApiOkResponse({ type: () => Notification })
  getUserNotifications(
    @Param() params: VolunteerIdDto,
    @Query() filters: GetNotificationsFiltersDto,
  ): Promise<Notification[]> {
    return this.notificationsService.getUserNotifications(params, filters);
  }

  @Put('/notifications/:notificationId')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiTags('Notifications')
  @ApiOkResponse({ type: Notification })
  updateNotification(
    @Param() params: NotificationIdDto,
    @Body() body: NotificationUpdateBodyDto,
  ): Promise<Notification> {
    return this.notificationsService.updateNotification(body, params);
  }

  @Put('/volunteers/:volunteerId/notifications/:notificationId/setRead')
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiBearerAuth()
  @ApiTags('Notifications')
  @ApiOkResponse({ type: Notification })
  setReadNotification(
    @Param() params: NotificationSetReadParamsDto,
    @GetUser() user: User,
  ): Promise<Notification> {
    return this.notificationsService.setReadNotification(params, user);
  }
}
