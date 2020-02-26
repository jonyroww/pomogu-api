import { Module } from "@nestjs/common";
import { HelpTypesService } from "./help-types.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { HelpTypesController } from "./help-types.controller";
import { HelpTypesRepository } from "./repositories/Help-types.repository";

@Module({
  imports: [TypeOrmModule.forFeature([HelpTypes, HelpTypesRepository])],
  controllers: [HelpTypesController],
  providers: [HelpTypesService],
  exports: []
})
export class HelpTypesModule {}
