import {
  IsOptional,
  IsArray,
  IsNumber,
  IsInt,
  IsString,
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsUrl,
  Length,
  IsEnum
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { TransformInt } from "../../common/utils/transform-int.util";
import { TransformDate } from "../../common/utils/transform-date.util";

export class BodyValidationDto {
  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsPhoneNumber("RU")
  phone: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({ type: "number", isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  help_type_ids: Array<number>;

  @ApiProperty({ type: "number", isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  citizen_type_ids: Array<number>;
}
