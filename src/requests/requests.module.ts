import { Module } from "@nestjs/common";
import { RequestsController } from "./requests.controller";
import { RequestsService } from "./requests.service";
import { RequestRepository } from "./repositories/Request.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./entities/Request.entity";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { UserRepository } from "../users/repositories/User.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Request,
      RequestRepository,
      HelpTypesRepository,
      CitezenTypesRepository,
      UserRepository
    ])
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
