import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Organisation } from "../entities/Organisation.entity";

export class FindAllResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  data: Organisation[];
}
