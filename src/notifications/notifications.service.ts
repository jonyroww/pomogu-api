import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from "typeorm-transactional-cls-hooked";
import { Notification } from "./entities/Notification.entity";
import { NotificationRepository } from "./repositories/Notification.repository";
import { UserRepository } from "../users/repositories/User.repository";
import { NotificationBodyDto } from "./dto/notification-body.dto";
import { NotificationUpdateBodyDto } from "./dto/notification-update-body.dto";
import { NotificationSetReadParamsDto } from "./dto/notification-set-read-params-dto";
import { NotificationIdDto } from "./dto/notification-id.dto";
import { VolunteerIdDto } from "./dto/volunteer-id.dto";
import { makeError } from 'src/common/errors';
import { User } from 'src/users/entities/User.entity';
import { RoleName } from 'src/constants/RoleName.enum';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { isUndefined } from 'util';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: NotificationRepository,
        private userRepository: UserRepository
      ) {}

    async createNotification({
        user_id,
        ...body
      }: NotificationBodyDto){
        const notification = this.notificationRepository.create(body);

        const user = await this.userRepository.findOne(
          user_id
        );

        notification.user_id = user.id;
        notification.title = body.title;
        notification.content = body.content;

        await this.notificationRepository.save(notification);
        return notification;
      }

    async getUserNotifications(
      params: VolunteerIdDto
    ) {
      const notifications = await this.notificationRepository.find({
        where: { user_id: params.volunteerId}
      })
      return notifications;
    }

    async updateNotification(
      body: NotificationUpdateBodyDto,
      params: NotificationIdDto
    ) {
      const notification = await this.notificationRepository.findOne({
        id: params.notificationId
      });
      if (body.title) {
        notification.title = body.title
      }
      if (body.content) {
        notification.content = body.content
      }
      if (!isUndefined(body.is_read)) {
        notification.is_read = body.is_read
      }
      await this.notificationRepository.save(notification);
      return notification;
    }

    async setReadNotification(
      params: NotificationSetReadParamsDto,
      user: User
    ) {
      const notification = await this.notificationRepository.findOne({
        id: params.notificationId,
        user_id: user.id
      });
      if (!notification) {
        throw makeError("NOTIFICATION_NOT_FOUND");
      }
      notification.is_read = true;
      await this.notificationRepository.save(notification);
      return notification;
    }
}
