import {
  Entity,
  Column,
  ManyToMany,
  JoinColumn,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HelpTypes } from '../../help-types/entities/help-types.entity';
import { CitezenTypes } from '../../citezen-types/entities/citezen-types.entity';
import { User } from '../../users/entities/User.entity';
import { ModerationStatus } from '../../constants/ModerationStatus.enum';

@Entity({ name: 'requests' })
export class Request {
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
  @CreateDateColumn()
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn()
  @Column({ type: 'timestamp with time zone', nullable: false })
  updated_at: Date;

  @ApiPropertyOptional({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @DeleteDateColumn()
  @Column({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  first_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  middle_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  last_name: string;

  @ApiProperty({ type: 'string' })
  @Column({ type: 'varchar' })
  city: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  phone: string;

  @ApiPropertyOptional({ type: 'text' })
  @Column({ type: 'text' })
  comment: string;

  @ApiProperty({ enum: ModerationStatus })
  @Column('enum', {
    enum: ModerationStatus,
    nullable: false,
  })
  moderation_status: ModerationStatus;

  @ApiPropertyOptional({ type: 'int' })
  @Column({ type: 'int' })
  user_id: number;

  @ApiPropertyOptional({ type: 'string' })
  @Column({ type: 'varchar' })
  status: string;

  @ApiPropertyOptional({ type: () => HelpTypes })
  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id,
    { eager: true },
  )
  @JoinTable({
    name: 'requests_help_types',
    joinColumn: { name: 'request_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'help_type_id', referencedColumnName: 'id' },
  })
  helpTypes: HelpTypes[];

  @ApiPropertyOptional({ type: () => CitezenTypes })
  @ManyToMany(
    () => CitezenTypes,
    (citezenTypes: CitezenTypes) => citezenTypes.id,
    { eager: true },
  )
  @JoinTable({
    name: 'requests_citezen_types',
    joinColumn: { name: 'request_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'citezen_type_id', referencedColumnName: 'id' },
  })
  citezenTypes: CitezenTypes[];

  @ApiProperty()
  @ManyToOne(
    () => User,
    (user: User) => user.requests,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
