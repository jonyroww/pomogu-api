import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/Notification.entity";
import { NotificationRepository } from "./repositories/Notification.repository";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { UserRepository } from "../users/repositories/User.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      NotificationRepository,
      UserRepository
    ])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
