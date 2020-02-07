import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
  OneToOne,
  JoinColumn
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "./../../users/entities/User.entity";

@Entity({ name: "phone_verifications" })
export class PhoneVerification {
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

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  updated_at: Date;

  @ApiProperty({ type: "string", nullable: false })
  @Column({ type: "varchar" })
  key: string;

  @ApiProperty({ type: "int", nullable: false, default: 0 })
  @Column({ type: "int" })
  sms_sent_count: number;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "timestamp with time zone" })
  sms_last_sent_at: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  sms_code: string;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: false, default: false })
  success: boolean;

  @Column({ type: "int" })
  user_id: number;

  @OneToOne(
    () => User,
    (user: User) => user.registration
  )
  @JoinColumn({ name: "user_id" })
  user: User;
}
