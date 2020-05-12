import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "./../../users/entities/User.entity";

@Entity({ name: "notifications" })
export class Notification {
  @ApiProperty()
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true
  })
  id: number;

  @ApiProperty({
    type: "string",
    example: "2019-11-22T16:03:05Z",
    nullable: false
  })
  @Column({
    nullable: false,
    type: "timestamp with time zone"
  })
  created_at: Date;

  @ApiProperty({ example: "Заголовок" })
  @Column({
    type: "text"
  })
  title: string;

  @ApiProperty({ example: "Содержание" })
  @Column({
    type: "text"
  })
  content: string;

  @ApiProperty({ type: "boolean", example: false })
  @Column({
    nullable: false,
    type: "bool"
  })
  is_read: boolean;

  @ApiPropertyOptional({ type: "int" })
  @Column({ type: "int" })
  user_id: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(
    () => User,
    (user: User) => user.notifications
  )
  @JoinColumn({ name: "user_id" })
  user: User;
}
