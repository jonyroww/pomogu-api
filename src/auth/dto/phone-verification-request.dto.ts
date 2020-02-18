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
  Length
} from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { isString } from "util";

export class PhoneVerificationRequestDto {
  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsPhoneNumber("RU")
  phone: string;
}
