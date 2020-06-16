import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  phone: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;
}
