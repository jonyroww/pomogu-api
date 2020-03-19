import { IsInt, IsString, IsAlphanumeric } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { TransformInt } from "../../common/utils/transform-int.util";

export class UpdatePhoneNumberDto {
  @ApiProperty({ type: "number" })
  @Transform(TransformInt)
  @IsInt()
  verification_id: number;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsAlphanumeric()
  verification_key: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  phone: string;
}
