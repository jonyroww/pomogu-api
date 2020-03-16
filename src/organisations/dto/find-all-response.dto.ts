import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FindAllResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  data: Array<Object>;
}
