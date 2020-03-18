import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RequestStatus } from "../../constants/RequestStatus.enum";

export class GetUserRequestDto {
  @ApiProperty({ enum: RequestStatus })
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
