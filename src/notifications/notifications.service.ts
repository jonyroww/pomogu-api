import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from "typeorm-transactional-cls-hooked";
import { Notification } from "./entities/Notification.entity";
import { NotificationRepository } from "./repositories/Notification.repository";
import { UserRepository } from "../users/repositories/User.repository";
import { NotificationBodyDto } from "./dto/notification-body.dto";
import { NotificationIdDto } from "./dto/notification-id.dto";
import { makeError } from 'src/common/errors';
import { User } from 'src/users/entities/User.entity';
import { RoleName } from 'src/constants/RoleName.enum';

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
      user: User,
      params: NotificationIdDto
      ) {
      const notifications = await this.notificationRepository.find({
        where: { user_id: params.volunteerId}
      })
      return notifications;
    }
}
