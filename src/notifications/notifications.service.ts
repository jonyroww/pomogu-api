import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/Notification.entity';
import { NotificationRepository } from './repositories/Notification.repository';
import { UserRepository } from '../users/repositories/User.repository';
import { NotificationBodyDto } from './dto/notification-body.dto';
import { NotificationUpdateBodyDto } from './dto/notification-update-body.dto';
import { NotificationSetReadParamsDto } from './dto/notification-set-read-params.dto';
import { GetNotificationsFiltersDto } from './dto/get-notifications-filter.dto';
import { NotificationIdDto } from './dto/notification-id.dto';
import { VolunteerIdDto } from './dto/volunteer-id.dto';
import { makeError } from 'src/common/errors';
import { User } from 'src/users/entities/User.entity';
import { isUndefined } from 'util';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
  ) {}

  async createNotification({
    user_id,
    ...body
  }: NotificationBodyDto): Promise<Notification> {
    const notification = this.notificationRepository.create(body);

    const user = await this.userRepository.findOne(user_id);
    if (!user || user.deleted_at) {
      throw makeError('USER_NOT_FOUND');
    }

    notification.user_id = user.id;
    notification.title = body.title;
    notification.content = body.content;

    await this.notificationRepository.save(notification);
    return notification;
  }

  async getUserNotifications(
    params: VolunteerIdDto,
    filters: GetNotificationsFiltersDto,
  ): Promise<Notification[]> {
    const qb = this.notificationRepository.createQueryBuilder('notifications');

    qb.where('user_id = :user_id', {
      user_id: params.volunteerId,
    });

    if (!isUndefined(filters.is_read)) {
      qb.andWhere('is_read = :is_read', {
        is_read: filters.is_read,
      });
    }

    qb.orderBy('created_at', 'DESC');

    const notifications = await qb
      .take(filters.limit)
      .skip(filters.offset)
      .getMany();

    return notifications;
  }

  async updateNotification(
    body: NotificationUpdateBodyDto,
    params: NotificationIdDto,
  ): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      id: params.notificationId,
    });
    if (!notification) {
      throw makeError('NOTIFICATION_NOT_FOUND');
    }
    if (body.title) {
      notification.title = body.title;
    }
    if (body.content) {
      notification.content = body.content;
    }
    if (!isUndefined(body.is_read)) {
      notification.is_read = body.is_read;
    }
    await this.notificationRepository.save(notification);
    return notification;
  }

  async setReadNotification(
    params: NotificationSetReadParamsDto,
    user: User,
  ): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      id: params.notificationId,
      user_id: user.id,
    });
    if (!notification) {
      throw makeError('NOTIFICATION_NOT_FOUND');
    }
    notification.is_read = true;
    await this.notificationRepository.save(notification);
    return notification;
  }
}
