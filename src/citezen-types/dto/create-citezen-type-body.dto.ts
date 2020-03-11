import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCitezenTypeBodyDto {
  @ApiProperty({ type: "string" })
  @IsString()
  title: string;
}
