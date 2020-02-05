import { Module } from "@nestjs/common";
import { HelpTypesService } from "./help-types.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { HelpTypesController } from "./help-types.controller";

@Module({
  imports: [TypeOrmModule.forFeature([HelpTypes])],
  controllers: [HelpTypesController],
  providers: [HelpTypesService]
})
export class HelpTypesModule {}
