import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Notification } from "../entities/Notification.entity";

@EntityRepository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {}