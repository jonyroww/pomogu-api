import { Module, ValidationPipe } from "@nestjs/common";
import { VolunteerRequestsController } from "./volunteer-requests.controller";
import { VolunteerRequestsService } from "./volunteer-requests.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VolunteerRequest } from "../volunteer-requests/entities/Volunteer-request.entity";
import { VolunteerRequestRepository } from "./repositories/Volunteer-request.repositories";
import { PhoneVerificationRepository } from "../auth/repository/Phone-verification.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { OrganisationRepository } from "../organisations/repositories/Organisation.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VolunteerRequest,
      VolunteerRequestRepository,
      PhoneVerificationRepository,
      HelpTypesRepository,
      CitezenTypesRepository,
      OrganisationRepository
    ])
  ],
  controllers: [VolunteerRequestsController],
  providers: [VolunteerRequestsService]
})
export class VolunteerRequestsModule {}
