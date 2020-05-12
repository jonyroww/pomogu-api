import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsUrl,
  IsEnum
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { TransformDate } from "../../common/utils/transform-date.util";
import { RoleName } from "../../constants/RoleName.enum";

export class createUserDto {
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

  @ApiPropertyOptional({ type: "Date" })
  @IsOptional()
  @IsDate()
  @Transform(TransformDate)
  birth_date: Date;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsPhoneNumber("RU")
  phone: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ enum: RoleName })
  @IsString()
  @IsEnum(RoleName)
  role: RoleName;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

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
  comment: string;

  @ApiProperty({ type: "boolean" })
  @IsBoolean()
  allow_search_in_messengers: boolean;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  password: string;

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

  @ApiProperty({ type: "number", isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  organisation_ids: Array<number>;
}
