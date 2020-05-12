import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

export class ParamsValidationDto {
  @ApiProperty({ type: 'number' })
  @Transform(TransformInt)
  @IsNumber()
  id: number;
}
