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
  IsUrl
} from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";

export class VolunteerRequestBodyDto {
  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  first_name: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  middle_name: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  last_name: string;

  @ApiPropertyOptional({ type: "Date" })
  @IsOptional()
  @IsDate()
  birth_date: Date;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  city: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsPhoneNumber("RU")
  phone: string;

  @ApiProperty({ type: "boolean" })
  @IsBoolean()
  is_individual: boolean;

  @ApiProperty({ type: "boolean" })
  @IsBoolean()
  hide_contacts: boolean;

  @ApiPropertyOptional({ type: "boolean" })
  @IsBoolean()
  need_expert_help: boolean;

  @ApiProperty({ type: "boolean" })
  @IsBoolean()
  with_fund: boolean;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  comment: string;

  @ApiProperty({ type: "boolean" })
  @IsBoolean()
  allow_search_in_messengers: boolean;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  @IsUrl()
  avatar: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  gender: string;

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
