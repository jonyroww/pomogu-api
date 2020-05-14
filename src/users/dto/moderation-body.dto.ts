import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ModerationStatus } from 'src/constants/ModerationStatus.enum';

export class ModerationBodyDto {
  @ApiProperty({ enum: ModerationStatus })
  @IsString()
  @IsEnum(ModerationStatus)
  moderation_status: ModerationStatus;
}
