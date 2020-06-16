import { IsString, IsPhoneNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PurposeType } from '../../constants/PurposeType.enum';

export class PhoneVerificationRequestDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @ApiProperty({ enum: PurposeType })
  @IsString()
  @IsEnum(PurposeType)
  purpose: PurposeType;
}
