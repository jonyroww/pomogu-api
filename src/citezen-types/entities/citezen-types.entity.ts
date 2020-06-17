import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'citezen_types' })
export class CitezenTypes {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
    readonly: true,
  })
  id: number;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @CreateDateColumn()
  @Column({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn()
  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @Column({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiProperty({ example: 'Название' })
  @Column({
    type: 'text',
  })
  title: string;
}
