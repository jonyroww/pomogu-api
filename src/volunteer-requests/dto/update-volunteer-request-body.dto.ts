import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  IsDate,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransformIntArray } from '../../common/utils/transform-array-int.util';
import { TransformDate } from '../../common/utils/transform-date.util';

export class UpdateVolunteerRequestBodyDto {
  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ type: 'Date' })
  @IsOptional()
  @IsDate()
  @Transform(TransformDate)
  birth_date: Date;

  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  is_individual: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  hide_contacts: boolean;

  @ApiPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  need_expert_help: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  with_fund: boolean;

  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  allow_search_in_messengers: boolean;

  @ApiPropertyOptional({ type: 'varchar' })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiPropertyOptional({ type: 'varchar' })
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
  citezen_type_ids: Array<number>;

  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  organisation_ids: Array<number>;
}
