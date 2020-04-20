import { Controller, UseGuards, Post, Body, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Notification } from "./entities/Notification.entity";
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from "../common/decorators/get-user.decorator";
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { NotificationsService } from "./notifications.service";
import { NotificationBodyDto } from "./dto/notification-body.dto";
import { NotificationIdDto } from "./dto/notification-id.dto";
import { User } from 'src/users/entities/User.entity';
import { UserWriteAccessGuard } from 'src/common/guards/user-write-access-guard';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post("notifications")
    @UseGuards(AuthGuard("jwt"), IsAdminGuard)
    @ApiBearerAuth()
    @ApiTags("Notifications")
    @ApiCreatedResponse({ type: Notification })
    createUser(@Body() body: NotificationBodyDto) {
        return this.notificationsService.createNotification(body);
    }

    @Get("/volunteers/:volunteerId/notifications")
    @UseGuards(AuthGuard("jwt"), UserWriteAccessGuard)
    @ApiBearerAuth()
    @ApiTags("Notifications")
    @ApiOkResponse({ type: Notification })
    getUserNotifications(
      @GetUser() user: User,
      @Param() params: NotificationIdDto
      ): Promise<Notification[]> {
      return this.notificationsService.getUserNotifications(user, params);
  }
}
