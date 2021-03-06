import { ApiProperty } from '@nestjs/swagger';
import { Organisation } from '../entities/Organisation.entity';

export class FindAllResponseDto {
  @ApiProperty({ type: 'number' })
  total: number;

  @ApiProperty({ type: Organisation, isArray: true })
  data: Organisation[];
}
