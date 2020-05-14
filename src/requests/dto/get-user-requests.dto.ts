import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '../../constants/RequestStatus.enum';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';

export class GetUserRequestDto extends PaginationFilterDto {
  @ApiProperty({ enum: RequestStatus })
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
