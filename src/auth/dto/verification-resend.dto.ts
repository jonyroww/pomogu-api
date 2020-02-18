import { IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerificationResendDto {
  @ApiProperty({ type: "varchar" })
  @IsString()
  key: string;
}
