import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformInt } from '../utils/transform-int.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
