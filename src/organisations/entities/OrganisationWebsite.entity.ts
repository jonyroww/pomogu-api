import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Organisation } from './Organisation.entity';

@Entity('organisation_websites')
export class OrganisationWebsite {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty({ type: 'string', example: 'website.com' })
  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  url: string;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  organisation_id: number;

  @ApiProperty()
  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.websites,
  )
  @JoinColumn({ name: 'organisation_id' })
  organisation: Organisation;
}
