import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { HelpTypes } from "../../help-types/entities/help-types.entity";
import { CitezenTypes } from "../../citezen-types/entities/citezen-types.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OrganisationPhoneNumber } from "./OrganisationPhoneNumbers.entity";
import { OrganisationWebsite } from "./OrganisationWebsite.entity";

@Entity({ name: "organisations" })
export class Organisation {
  @ApiProperty()
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true
  })
  id: number;

  @ApiProperty({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({
    nullable: false,
    type: "timestamp with time zone"
  })
  created_at: Date;

  @ApiProperty({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  updated_at: Date;

  @ApiPropertyOptional({ example: 123456789 })
  @Column({
    type: "varchar",
    length: 255
  })
  inn: string;

  @ApiPropertyOptional({ example: "Название" })
  @Column({
    type: "text"
  })
  title: string;

  @ApiProperty({ type: "string", example: "Описание организации" })
  @Column({
    nullable: false,
    type: "text"
  })
  description: string;

  @ApiPropertyOptional({ example: "Адрес" })
  @Column({
    type: "text"
  })
  address: string;

  @ApiProperty({ type: "string", example: "График работы" })
  @Column({
    nullable: false,
    type: "varchar"
  })
  work_schedule: string;

  @ApiProperty({ type: "string", example: "mail@mail.com" })
  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  email: string;

  @ApiProperty({ type: "string", example: "website.com" })
  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  website_address: string;

  @ApiProperty({ type: "boolean", example: true })
  @Column({
    nullable: false,
    type: "bool"
  })
  publish_agreement: boolean;

  @ApiProperty({ type: "string", example: "Имя Фамилия" })
  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  full_name: string;

  @ApiPropertyOptional({ example: "Комментарий" })
  @Column({
    nullable: false,
    type: "text"
  })
  comment_for_dev: string;

  @ApiPropertyOptional({ type: "number", example: "51.661535" })
  @Column({
    type: "numeric"
  })
  location_lat: number;

  @ApiPropertyOptional({ type: "number", example: "51.661535" })
  @Column({
    type: "numeric"
  })
  location_long: number;

  @ApiPropertyOptional({ example: "Logo url" })
  @Column({
    type: "varchar"
  })
  logo: string;

  @ApiPropertyOptional()
  @Column({
    type: "text"
  })
  need_help: string;

  @ApiPropertyOptional()
  @Column({
    type: "text"
  })
  organisation_type: string;

  @ApiProperty()
  @OneToMany(
    () => OrganisationPhoneNumber,
    (organisationPhoneNumbers: OrganisationPhoneNumber) =>
      organisationPhoneNumbers.organisation,
    { eager: true }
  )
  phone_numbers: OrganisationPhoneNumber[];

  @ApiProperty()
  @OneToMany(
    () => OrganisationWebsite,
    (organisationWebsite: OrganisationWebsite) =>
      organisationWebsite.organisation,
    { eager: true }
  )
  websites: OrganisationWebsite[];

  @ApiPropertyOptional({ type: () => HelpTypes })
  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "organisation_help_types",
    joinColumn: { name: "organisation_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "help_types_id", referencedColumnName: "id" }
  })
  helpTypes: HelpTypes[];

  @ApiPropertyOptional({ type: () => CitezenTypes })
  @ManyToMany(
    () => CitezenTypes,
    (citezenTypes: CitezenTypes) => citezenTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "organisation_citezen_types",
    joinColumn: { name: "organisation_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "citezen_types_id", referencedColumnName: "id" }
  })
  citezenTypes: CitezenTypes[];
}
