import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ModerationStatus } from "src/constants/ModerationStatus.enum";

export class ModerationBodyDto {
  @ApiProperty({ type: ModerationStatus })
  @IsEnum(ModerationStatus)
  moderation_status: ModerationStatus;
}
