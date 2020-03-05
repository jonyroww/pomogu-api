import { PaginationFilterDto } from "../../common/dto/pagination-filter.dto";
import { IsOptional, IsArray, IsNumber, IsInt } from "class-validator";
import { Transform } from "class-transformer";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { TransformInt } from "../../common/utils/transform-int.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class QueryFilterDto extends PaginationFilterDto {
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
