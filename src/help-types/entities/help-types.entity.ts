import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  Double
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity({ name: "help_types" })
export class HelpTypes {
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

  @ApiProperty({ type: "string", example: "2019-11-22T16:03:05Z" })
  @Column({ type: "timestamp with time zone" })
  deleted_at: Date;

  @ApiProperty({ example: "Название" })
  @Column({
    type: "text"
  })
  title: string;
}
