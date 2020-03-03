import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NotModeratedRequestDto {
  @ApiProperty({ type: "number" })
  @IsString()
  moderation_status: boolean;
}
