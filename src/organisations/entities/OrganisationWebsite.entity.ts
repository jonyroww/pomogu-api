import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Organisation } from "./Organisation.entity";

@Entity("organisation_websites")
export class OrganisationWebsite {
  @ApiProperty()
  @PrimaryColumn({
    type: "int",
    generated: true,
    readonly: true
  })
  id: number;

  @ApiProperty({ type: "string", example: "website.com" })
  @Column({
    nullable: false,
    type: "varchar",
    length: 255
  })
  url: string;

  @ApiProperty()
  @Column({
    type: "int",
    nullable: false
  })
  organisation_id: number;

  @ApiProperty()
  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.websites
  )
  @JoinColumn({ name: "organisation_id" })
  organisation: Organisation;
}
