import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  IsDate,
  IsEmail,
  IsBoolean,
  IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransformIntArray } from '../../common/utils/transform-array-int.util';
import { TransformDate } from '../../common/utils/transform-date.util';

export class VolunteerRequestAdminBodyDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsDate()
  @Transform(TransformDate)
  birth_date: Date;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  is_individual: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  hide_contacts: boolean;

  @ApiPropertyOptional({ type: 'boolean' })
  @IsBoolean()
  need_expert_help: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  with_fund: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  allow_search_in_messengers: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  help_type_ids: Array<number>;

  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  citizen_type_ids: Array<number>;

  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  organisation_ids: Array<number>;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;
}
