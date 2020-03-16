import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Organisation } from "../entities/Organisation.entity";

export class FindAllResponseDto {
  @ApiProperty({ type: "number" })
  total: number;

  @ApiProperty({ type: "object", isArray: true })
  data: Organisation[];
}
