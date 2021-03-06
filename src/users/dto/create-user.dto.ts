import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformIntArray } from '../../common/utils/transform-array-int.util';
import { TransformDate } from '../../common/utils/transform-date.util';
import { RoleName } from '../../constants/RoleName.enum';

export class CreateUserDto {
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

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ enum: RoleName })
  @IsString()
  @IsEnum(RoleName)
  role: RoleName;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  comment: string;

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
}
