import { IsString, IsOptional, IsBoolean } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class NotificationUpdateBodyDto {
  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: "text" })
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({ type: "boolean" })
  @IsOptional()
  @IsBoolean()
  is_read: boolean;
}
