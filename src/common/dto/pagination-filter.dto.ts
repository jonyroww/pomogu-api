import {
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  Matches,
  Min
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../utils/transform-int.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationFilterDto {
  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @Transform(TransformInt)
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @Transform(TransformInt)
  @IsOptional()
  offset: number;
}
