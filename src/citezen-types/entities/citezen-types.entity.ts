import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  Double
} from "typeorm";

@Entity({ name: "citezen_types" })
export class CitezenTypes {
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
    type: "text"
  })
  title: string;
}
