import { PaginationFilterDto } from "../../common/dto/pagination-filter.dto";
import {
  IsOptional,
  IsEnum
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ModerationStatus } from "src/constants/ModerationStatus.enum";
import { RoleName } from "src/constants/RoleName.enum";

export class GetAllQueryDto extends PaginationFilterDto {
  @ApiPropertyOptional({ enum: ModerationStatus })
  @IsOptional()
  @IsEnum(ModerationStatus)
  moderation_status: ModerationStatus;

  @ApiPropertyOptional({ enum: RoleName })
  @IsOptional()
  @IsEnum(RoleName)
  role: RoleName;
}
