import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
    Index,
    OneToOne,
    JoinColumn,
    ManyToOne
  } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./../../users/entities/User.entity";

@Entity({ name: "notifications" })
export class Notification {
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

    @ApiProperty()
    @Column({ 
        nullable: false,
        type: "int" })
    user_id: number;

    @ApiProperty()
    @ManyToOne(
        () => User,
        (user: User) => user.notifications
    )
    @JoinColumn({ name: "user_id" })
    user: User;

    @ApiProperty({ example: "Заголовок" })
    @Column({
        type: "text"
    })
    title: string;

    @ApiProperty({ example: "Содержание" })
    @Column({
        type: "text"
    })
    content: string;
}
