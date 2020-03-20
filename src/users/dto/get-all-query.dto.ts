import { PaginationFilterDto } from "../../common/dto/pagination-filter.dto";
import {
  IsOptional,
  IsArray,
  IsNumber,
  IsInt,
  IsBoolean,
  IsEnum
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ModerationStatus } from "src/constants/ModerationStatus.enum";

export class GetAllQueryDto extends PaginationFilterDto {
  @ApiPropertyOptional({ enum: ModerationStatus })
  @IsEnum(ModerationStatus)
  moderation_status: ModerationStatus;
}
