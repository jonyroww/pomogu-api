import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerificationPhoneDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  key: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Length(6, 6)
  sms_code: string;
}
