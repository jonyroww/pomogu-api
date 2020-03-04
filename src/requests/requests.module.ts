import { Module } from "@nestjs/common";
import { RequestsController } from "./requests.controller";
import { RequestsService } from "./requests.service";
import { RequestRepository } from "./repositories/Request.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./entities/Request.entity";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Request,
      RequestRepository,
      HelpTypesRepository,
      CitezenTypesRepository
    ])
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
