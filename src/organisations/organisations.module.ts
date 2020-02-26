import { Module } from "@nestjs/common";
import { OrganisationsController } from "./organisations.controller";
import { OrganisationsService } from "./organisations.service";
import { Organisation } from "./entities/Organisation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationRepository } from "./repositories/Organisation.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Organisation, OrganisationRepository])],
  controllers: [OrganisationsController],
  providers: [OrganisationsService]
})
export class OrganisationsModule {}
