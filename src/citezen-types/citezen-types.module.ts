import { Module } from "@nestjs/common";
import { CitezenTypesService } from "./citezen-types.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CitezenTypes } from "./entities/citezen-types.entity";
import { CitezenTypesController } from "./citezen-types.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CitezenTypes])],
  controllers: [CitezenTypesController],
  providers: [CitezenTypesService]
})
export class CitezenTypesModule {}
