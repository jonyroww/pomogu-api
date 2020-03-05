import { PaginationFilterDto } from "../../common/dto/pagination-filter.dto";
import {
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  IsEnum
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { TransformInt } from "../../common/utils/transform-int.util";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ModerationStatus } from "../../constants/ModerationStatus.enum";

export class GetAllQueryFilterDto extends PaginationFilterDto {
  @ApiPropertyOptional({ type: "number", isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  help_type_ids: Array<number>;

  @ApiPropertyOptional({ type: "number", isArray: true })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(TransformIntArray)
  citizen_type_ids: Array<number>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ModerationStatus)
  moderation_status: ModerationStatus;

  @ApiPropertyOptional({ type: "number" })
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  limit: number;

  @ApiPropertyOptional({ type: "number" })
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  offset: number;
}
