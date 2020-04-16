import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from "typeorm-transactional-cls-hooked";
import { Notification } from "./entities/Notification.entity";
import { NotificationRepository } from "./repositories/Notification.repository";
import { UserRepository } from "../users/repositories/User.repository";
import { NotificationBodyDto } from "./dto/notification-body.dto";
import { NotificationIdDto } from "./dto/notification-id.dto";
import { makeError } from 'src/common/errors';

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

    async findOne(params: NotificationIdDto) {
      const notification = await this.notificationRepository.findOne(params.id);
      if (!notification) {
        throw makeError("NOTIFICATION_NOT_FOUND");
      }
      return notification;
    }
}
