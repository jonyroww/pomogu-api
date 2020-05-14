import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ type: 'varchar' })
  @IsString()
  phone: string;

  @ApiProperty({ type: 'varchar' })
  @IsString()
  password: string;
}
