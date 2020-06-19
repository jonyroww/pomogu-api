import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'help_types' })
export class HelpTypes {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @CreateDateColumn({
    nullable: false,
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiProperty({ type: 'string', example: '2019-11-22T16:03:05Z' })
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: Date;

  @ApiProperty({ example: 'Название' })
  @Column({
    type: 'text',
  })
  title: string;
}
