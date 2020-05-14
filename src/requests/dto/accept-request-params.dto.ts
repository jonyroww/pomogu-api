import { IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptRequestParamsDto {
  @ApiProperty()
  @IsNumber()
  @Transform(TransformInt)
  @IsInt()
  requestId: number;
}
