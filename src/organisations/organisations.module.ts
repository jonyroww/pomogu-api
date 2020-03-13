import { Module } from "@nestjs/common";
import { OrganisationsController } from "./organisations.controller";
import { OrganisationsService } from "./organisations.service";
import { Organisation } from "./entities/Organisation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationRepository } from "./repositories/Organisation.repository";
import { OrganisationPhoneNumberRepository } from "./repositories/OrganisationPhoneNumbers.repository";
import { OrganisationWebsiteRepository } from "./repositories/OrganisationWebsite.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organisation,
      OrganisationRepository,
      OrganisationPhoneNumberRepository,
      OrganisationWebsiteRepository,
      HelpTypesRepository,
      CitezenTypesRepository
    ])
  ],
  controllers: [OrganisationsController],
  providers: [OrganisationsService]
})
export class OrganisationsModule {}
