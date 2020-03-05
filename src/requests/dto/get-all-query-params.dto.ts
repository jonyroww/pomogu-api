import { PaginationFilterDto } from "../../common/dto/pagination-filter.dto";
import { IsOptional, IsArray, IsNumber, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { ApiPropertyOptional } from "@nestjs/swagger";

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
  @IsBoolean()
  not_moderated: boolean;
}