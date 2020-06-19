import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './../../users/entities/User.entity';
import { PurposeType } from '../../constants/PurposeType.enum';
import { Exclude } from 'class-transformer';

@Entity({ name: 'phone_verifications' })
export class PhoneVerification {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: '2019-11-22T16:03:05Z',
    nullable: false,
  })
  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiProperty({ type: 'string', nullable: false })
  @Column({ type: 'varchar' })
  key: string;

  @ApiProperty({ type: 'varchar', nullable: false })
  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @ApiProperty({ type: 'int', nullable: false, default: 0 })
  @Column({ type: 'int' })
  sms_sent_count: number;

  @ApiProperty({ type: 'int', nullable: false, default: 0 })
  @Column({ type: 'int' })
  wrong_attempts_count: number;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'timestamp with time zone', default: Date.now() })
  sms_last_sent_at: Date;

  @ApiPropertyOptional({ type: 'string' })
  @Exclude()
  @Column({ type: 'varchar' })
  sms_code: string;

  @ApiProperty({ enum: PurposeType })
  @Column('enum', { enum: PurposeType, nullable: false })
  purpose: PurposeType;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false, default: false })
  used: boolean;

  @ApiProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false, default: false })
  success: boolean;

  @ApiProperty()
  @Column({ type: 'int' })
  user_id: number;

  @ApiProperty({ type: () => User })
  @OneToOne(
    () => User,
    (user: User) => user.registration,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
