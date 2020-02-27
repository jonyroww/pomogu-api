import { ApiProperty } from "@nestjs/swagger";

export class TokenCreatedDTO {
  @ApiProperty()
  token: string;
}
