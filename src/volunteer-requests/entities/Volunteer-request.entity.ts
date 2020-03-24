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
import { Organisation } from "../../organisations/entities/Organisation.entity";
import { HelpTypes } from "../../help-types/entities/help-types.entity";
import { CitezenTypes } from "../../citezen-types/entities/citezen-types.entity";
import { ModerationStatus } from "../../constants/ModerationStatus.enum";

@Entity({ name: "volunteer_requests" })
export class VolunteerRequest {
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
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ type: "string" })
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

  @ApiProperty({ enum: ModerationStatus })
  @Column("enum", {
    enum: ModerationStatus,
    nullable: false
  })
  moderation_status: ModerationStatus;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: false, default: true })
  allow_search_in_messengers: boolean;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  avatar: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar" })
  gender: string;

  @ApiPropertyOptional({ type: "int" })
  @Column({ type: "int", nullable: false })
  verification_id: number;

  @ApiPropertyOptional({ type: "int" })
  @Column({ type: "int" })
  user_id: number;

  @ApiPropertyOptional({ type: () => Organisation })
  @ManyToMany(
    () => Organisation,
    (organisation: Organisation) => organisation.id,
    { eager: true }
  )
  @JoinTable({
    name: "volunteer_requests_orgs",
    joinColumn: { name: "volunteer_request_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "organisation_id", referencedColumnName: "id" }
  })
  organisations: Organisation[];

  @ApiPropertyOptional({ type: () => HelpTypes })
  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "volunteer_requests_help_types",
    joinColumn: { name: "volunteer_request_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "help_type_id", referencedColumnName: "id" }
  })
  helpTypes: HelpTypes[];

  @ApiPropertyOptional({ type: () => CitezenTypes })
  @ManyToMany(
    () => CitezenTypes,
    (citezenTypes: CitezenTypes) => citezenTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "volunteer_requests_citezen_types",
    joinColumn: { name: "volunteer_request_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "citezen_type_id", referencedColumnName: "id" }
  })
  citezenTypes: CitezenTypes[];
}
