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
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransformInt } from "../../common/utils/transform-int.util";
import { Transform } from "class-transformer";

export class NotificationBodyDto {
    @ApiProperty({ type: "number" })
    @Transform(TransformInt)
    @IsInt()
    user_id: number;

    @ApiPropertyOptional({ type: "text" })
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional({ type: "text" })
    @IsOptional()
    @IsString()
    content: string;
}