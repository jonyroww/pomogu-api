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
import { ApiProperty } from "@nestjs/swagger";
import { ModerationStatus } from "../../constants/ModerationStatus.enum";

export class ModerateRequestBodyDto {
  @ApiProperty({ enum: ModerationStatus })
  @IsEnum(ModerationStatus)
  moderation_status: ModerationStatus;
}
