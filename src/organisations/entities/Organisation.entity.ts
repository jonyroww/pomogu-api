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
import { CitezenTypesModule } from "src/citezen-types/citezen-types.module";
import { CitezenTypesController } from "src/citezen-types/citezen-types.controller";

@Entity({ name: "organisation" })
export class Organisation {
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true
  })
  id: number;

  @Column({
    nullable: false,
    type: "timestamp with time zone"
  })
  created_at: Date;

  @Column({ type: "timestamp with time zone" })
  updated_at: Date;

  @Column({
    type: "varchar",
    length: 255
  })
  inn: string;

  @Column({
    type: "text"
  })
  title: string;

  @Column({
    nullable: false,
    type: "text"
  })
  description: string;

  @Column({
    type: "text"
  })
  address: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  phone_number: string;

  @Column({
    nullable: false,
    type: "varchar"
  })
  work_schedule: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  email: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  website_address: string;

  @Column({
    nullable: false,
    type: "bool"
  })
  publish_agreement: boolean;

  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  full_name: string;

  @Column({
    nullable: false,
    type: "text"
  })
  comment_for_dev: string;

  @Column({
    type: "numeric"
  })
  location_lat: number;

  @Column({
    type: "numeric"
  })
  location_long: number;

  @Column({
    type: "varchar"
  })
  logo: string;

  @Column({
    type: "text"
  })
  need_help: string;

  @Column({
    type: "text"
  })
  organisation_type: string;

  @ManyToMany(
    () => HelpTypes,
    (helpTypes: HelpTypes) => helpTypes.id
  )
  @JoinTable()
  helpTypes: HelpTypes[];

  @ManyToMany(
    () => CitezenTypes,
    (citezenTypes: CitezenTypes) => citezenTypes.id
  )
  @JoinTable()
  citezenTypes: CitezenTypes[];
}
