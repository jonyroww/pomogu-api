import { Module } from "@nestjs/common";
import { RequestsController } from "./requests.controller";
import { RequestsService } from "./requests.service";
import { RequestRepository } from "./repositories/Request.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./entities/Request.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Request, RequestRepository])],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
