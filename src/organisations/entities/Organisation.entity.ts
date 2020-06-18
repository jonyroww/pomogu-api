import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { HelpTypes } from '../../help-types/entities/help-types.entity';
import { CitezenTypes } from '../../citezen-types/entities/citezen-types.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrganisationPhoneNumber } from './OrganisationPhoneNumbers.entity';
import { OrganisationWebsite } from './OrganisationWebsite.entity';
import { User } from '../../users/entities/User.entity';

@Entity({ name: 'organisations' })
export class Organisation {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @CreateDateColumn()
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn()
  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiPropertyOptional({ example: 123456789 })
  @Column({
    type: 'varchar',
    length: 255,
  })
  inn: string;

  @ApiPropertyOptional({ example: 'Название' })
  @Column({
    type: 'text',
  })
  title: string;

  @ApiProperty({ type: 'string', example: 'Описание организации' })
  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @ApiPropertyOptional({ example: 'Адрес' })
  @Column({
    type: 'text',
  })
  address: string;

  @ApiPropertyOptional({ example: 'Москва', type: 'string' })
  @Column({
    type: 'varchar',
  })
  city: string;

  @ApiPropertyOptional({ type: 'string' })
  @Column({
    type: 'text',
  })
  appeal_to_volunteer: string;

  @ApiProperty({ type: 'string', example: 'График работы' })
  @Column({
    nullable: false,
    type: 'varchar',
  })
  work_schedule: string;

  @ApiProperty({ type: 'string', example: 'mail@mail.com' })
  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  email: string;

  @ApiProperty({ type: 'boolean', example: true })
  @Column({
    nullable: false,
    type: 'bool',
  })
  publish_agreement: boolean;

  @ApiProperty({ type: 'string', example: 'Имя Фамилия' })
  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  full_name: string;

  @ApiPropertyOptional({ example: 'Комментарий' })
  @Column({
    nullable: false,
    type: 'text',
  })
  comment_for_dev: string;

  @ApiPropertyOptional({ type: 'number', example: '51.661535' })
  @Column({
    type: 'numeric',
  })
  location_lat: number;

  @ApiPropertyOptional({ type: 'number', example: '51.661535' })
  @Column({
    type: 'numeric',
  })
  location_long: number;

  @ApiPropertyOptional({ example: 'Logo url' })
  @Column({
    type: 'varchar',
  })
  logo: string;

  @ApiPropertyOptional()
  @Column({
    type: 'text',
  })
  need_help: string;

  @ApiPropertyOptional()
  @Column({
    type: 'text',
  })
  organisation_type: string;

  @ApiProperty()
  @Column({ type: 'int' })
  owner_id: number;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @DeleteDateColumn()
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
  })
  deleted_at: Date;

  @OneToOne(
    () => User,
    (user: User) => user.own_organisation,
  )
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ApiProperty()
  @OneToMany(
    () => OrganisationPhoneNumber,
    (organisationPhoneNumbers: OrganisationPhoneNumber) =>
      organisationPhoneNumbers.organisation,
    { eager: true, cascade: true },
  )
  phone_numbers: OrganisationPhoneNumber[];

  @ApiProperty()
  @OneToMany(
    () => OrganisationWebsite,
    (organisationWebsite: OrganisationWebsite) =>
      organisationWebsite.organisation,
    { eager: true, cascade: true },
  )
  websites: OrganisationWebsite[];

  @ApiPropertyOptional({ type: () => HelpTypes })
  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id,
    { eager: true },
  )
  @JoinTable({
    name: 'organisation_help_types',
    joinColumn: { name: 'organisation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'help_types_id', referencedColumnName: 'id' },
  })
  helpTypes: HelpTypes[];

  @ApiPropertyOptional({ type: () => CitezenTypes })
  @ManyToMany(
    () => CitezenTypes,
    (citezenTypes: CitezenTypes) => citezenTypes.id,
    { eager: true },
  )
  @JoinTable({
    name: 'organisation_citezen_types',
    joinColumn: { name: 'organisation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'citezen_types_id', referencedColumnName: 'id' },
  })
  citezenTypes: CitezenTypes[];
}
