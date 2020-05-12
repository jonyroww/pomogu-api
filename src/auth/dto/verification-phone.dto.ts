import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerificationPhoneDto {
  @ApiProperty({ type: "varchar" })
  @IsString()
  key: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @Length(6, 6)
  sms_code: string;
}
