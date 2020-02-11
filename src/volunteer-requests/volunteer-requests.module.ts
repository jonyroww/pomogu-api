import { Module } from '@nestjs/common';
import { VolunteerRequestsController } from './volunteer-requests.controller';
import { VolunteerRequestsService } from './volunteer-requests.service';

@Module({
  controllers: [VolunteerRequestsController],
  providers: [VolunteerRequestsService]
})
export class VolunteerRequestsModule {}
