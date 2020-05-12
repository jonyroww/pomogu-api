import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CitezenTypeBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  title: string;
}
