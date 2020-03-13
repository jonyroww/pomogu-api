import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
  OneToOne
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PhoneVerification } from "./../../auth/entities/Phone-verification.entity";
import { HelpTypes } from "../../help-types/entities/help-types.entity";
import { CitezenTypes } from "../../citezen-types/entities/citezen-types.entity";
import { Organisation } from "../../organisations/entities/Organisation.entity";
import { Request } from "../../requests/entities/Request.entity";
import { ModerationStatus } from "../../constants/ModerationStatus.enum";

@Entity({ name: "users" })
export class User {
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
  @Index()
  @Column({
    nullable: false,
    type: "timestamp with time zone"
  })
  created_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  updated_at: Date;

  @ApiPropertyOptional({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  deleted_at: Date;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  first_name: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  middle_name: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  last_name: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "date" })
  birth_date: Date;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  city: string;

  @ApiPropertyOptional({ type: "string" })
  @Index()
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ type: "string" })
  @Index()
  @Column({ type: "varchar", unique: true, nullable: false })
  phone: string;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: false })
  is_individual: boolean;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: false })
  hide_contacts: boolean;

  @ApiPropertyOptional({ type: "boolean" })
  @Column({ type: "boolean" })
  need_expert_help: boolean;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: false })
  with_fund: boolean;

  @ApiPropertyOptional({ type: "text" })
  @Column({ type: "text" })
  comment: string;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: false, default: true })
  allow_search_in_messengers: boolean;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  avatar: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  gender: string;

  @ApiProperty({ type: "string", nullable: false })
  @Column({ type: "varchar" })
  password: string;

  @ApiProperty({ type: "boolean", nullable: false, default: false })
  @Column("enum", {
    enum: ModerationStatus,
    default: ModerationStatus.NOT_MODERATED
  })
  moderation_status: ModerationStatus;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  role: string;

  @ApiProperty()
  @OneToMany(
    () => Request,
    (request: Request) => request.user_id
  )
  requests: Request[];

  @OneToOne(
    () => PhoneVerification,
    (registration: PhoneVerification) => registration.user
  )
  registration: PhoneVerification;

  @ApiPropertyOptional({ type: () => CitezenTypes })
  @ManyToMany(
    () => CitezenTypes,
    (citezenTypes: CitezenTypes) => citezenTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "users_citezen_types",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "citezen_type_id", referencedColumnName: "id" }
  })
  citezenTypes: CitezenTypes[];

  @ApiPropertyOptional({ type: () => HelpTypes })
  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "users_help_types",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "help_type_id", referencedColumnName: "id" }
  })
  helpTypes: HelpTypes[];

  @ApiPropertyOptional({ type: () => Organisation })
  @ManyToMany(
    () => Organisation,
    (organisation: Organisation) => organisation.id,
    { eager: true }
  )
  @JoinTable({
    name: "users_organisations",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "organisation_id", referencedColumnName: "id" }
  })
  organisations: Organisation[];
}
