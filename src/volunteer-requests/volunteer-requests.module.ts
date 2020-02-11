import { Module, ValidationPipe } from "@nestjs/common";
import { VolunteerRequestsController } from "./volunteer-requests.controller";
import { VolunteerRequestsService } from "./volunteer-requests.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VolunteerRequest } from "../volunteer-requests/entities/Volunteer-request.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerRequest])],
  controllers: [VolunteerRequestsController],
  providers: [VolunteerRequestsService]
})
export class VolunteerRequestsModule {}
