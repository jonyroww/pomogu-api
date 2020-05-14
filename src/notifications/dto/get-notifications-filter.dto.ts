import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';
import { Transform } from 'class-transformer';
import { TransformBoolean } from '../../common/utils/transform-boolean.utils';

export class GetNotificationsFiltersDto extends PaginationFilterDto {
  @ApiPropertyOptional({ type: 'boolean' })
  @Transform(TransformBoolean)
  @IsOptional()
  @IsBoolean()
  is_read: boolean;
}
