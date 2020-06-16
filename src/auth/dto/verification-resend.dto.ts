import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerificationResendDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  key: string;
}
