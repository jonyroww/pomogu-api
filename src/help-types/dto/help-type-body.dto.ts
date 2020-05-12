import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HelpTypeBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  title: string;
}
