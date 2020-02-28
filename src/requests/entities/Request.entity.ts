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
import { HelpTypes } from "../../help-types/entities/help-types.entity";
import { CitezenTypes } from "../../citezen-types/entities/citezen-types.entity";

@Entity({ name: "requests" })
export class Request {
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
  @Column({ type: "timestamp with time zone", nullable: false })
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
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiPropertyOptional({ type: "string" })
  @Column({ type: "varchar", unique: true, nullable: false })
  phone: string;

  @ApiPropertyOptional({ type: "text" })
  @Column({ type: "text" })
  comment: string;

  @ApiProperty({ type: "boolean" })
  @Column({ type: "boolean", nullable: true, default: null })
  is_moderated: boolean;

  @ApiPropertyOptional({ type: "int" })
  @Column({ type: "int" })
  volunteer_id: number;

  @ApiPropertyOptional({ type: "varchar" })
  @Column({ type: "varchar" })
  status: string;

  @ApiPropertyOptional({ type: () => HelpTypes })
  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id,
    { eager: true }
  )
  @JoinTable({
    name: "requests_help_types",
    joinColumn: { name: "request_id", referencedColumnName: "id" },
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
    name: "requests_citezen_types",
    joinColumn: { name: "request_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "citezen_type_id", referencedColumnName: "id" }
  })
  citezenTypes: CitezenTypes[];
}
