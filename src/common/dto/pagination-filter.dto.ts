import {
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  Matches,
  Min,
} from 'class-validator';
import { Transform } from "class-transformer";
import { TransformInt } from "../utils/transform-int.util";

export class PaginationFilterDto {
         @IsInt()
         @Min(0)
         @Transform(TransformInt)
         @IsOptional()
         limit: number;

         @IsInt()
         @Min(0)
         @Transform(TransformInt)
         @IsOptional()
         offset: number;
       }