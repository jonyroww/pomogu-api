import { Controller, UseGuards, Post, Body, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Notification } from "./entities/Notification.entity";
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { NotificationsService } from "./notifications.service";
import { NotificationBodyDto } from "./dto/notification-body.dto";
import { NotificationIdDto } from "./dto/notification-id.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @ApiTags("Notifications")
    @ApiCreatedResponse({ type: Notification })
    @UseGuards(AuthGuard("jwt"), IsAdminGuard)
    @ApiBearerAuth()
    @Post()
    createUser(@Body() body: NotificationBodyDto) {
        return this.notificationsService.createNotification(body);
    }

    @ApiTags("Notifications")
    @ApiOkResponse({ type: Notification })
    @Get("/:id")
    findOne(@Param() params: NotificationIdDto): Promise<Notification> {
    return this.notificationsService.findOne(params);
  }
}
