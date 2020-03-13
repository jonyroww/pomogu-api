import {
  IsNumber,
  IsInt,
  IsString,
  Length,
  IsOptional,
  IsEmail,
  IsUrl,
  IsBoolean,
  IsArray
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class OrganisationBodyDto {
  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  inn: string;

  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  work_schedule: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: "varchar" })
  @IsArray()
  @IsString({ each: true })
  phone_numbers: Array<string>;

  @ApiProperty({ type: "varchar" })
  @IsArray()
  @IsString({ each: true })
  websites: Array<string>;

  @ApiProperty({ type: "boolean" })
  @IsBoolean()
  publish_agreement: boolean;

  @ApiProperty({ type: "varchar" })
  @IsString()
  full_name: string;

  @ApiProperty({ type: "text" })
  @IsString()
  comment_for_dev: string;

  @ApiPropertyOptional({ type: "number", example: "51.661535" })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  location_lat: number;

  @ApiPropertyOptional({ type: "number", example: "51.661535" })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  location_long: number;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsUrl()
  logo: string;

  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  need_help: string;

  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  organisation_type: string;

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
