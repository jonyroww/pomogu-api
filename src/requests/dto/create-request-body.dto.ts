import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformIntArray } from '../../common/utils/transform-array-int.util';

export class BodyValidationDto {
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

  @ApiProperty({ type: 'string' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  comment: string;

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
}
