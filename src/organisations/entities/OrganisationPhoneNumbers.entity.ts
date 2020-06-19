import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Organisation } from './Organisation.entity';

@Entity({ name: 'organisation_phone_numbers' })
export class OrganisationPhoneNumber {
  @ApiProperty()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  phone_number: string;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  organisation_id: number;

  @ApiProperty()
  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.phone_numbers,
  )
  @JoinColumn({ name: 'organisation_id' })
  organisation: Organisation;
}
