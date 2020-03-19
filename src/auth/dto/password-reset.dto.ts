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
  IsEnum
} from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { TransformInt } from "../../common/utils/transform-int.util";
import { TransformDate } from "../../common/utils/transform-date.util";
import { PurposeType } from "../../constants/PurposeType.enum";

export class PasswordResetDto {
  @ApiProperty({ type: "number" })
  @Transform(TransformInt)
  @IsNumber()
  verification_id: number;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsAlphanumeric()
  verification_key: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  password: string;
}
