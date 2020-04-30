import { IsNumber, IsInt } from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { ApiProperty } from "@nestjs/swagger";

export class NotificationSetReadParamsDto {
  @ApiProperty({ type: "number" })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  notificationId: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  volunteerId: number;
}
