import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReportBodyDto {
  @ApiProperty({ type: "varchar" })
  @IsString()
  text: string;
}
