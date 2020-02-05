import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  Double
} from "typeorm";

@Entity({ name: "help_types" })
export class HelpTypes {
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
