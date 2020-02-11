import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { VolunteerRequestsService } from "./volunteer-requests.service";
import { VolunteerRequest } from "./entities/Volunteer-request.entity";
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { VolunteerRequestBodyDto } from "./dto/volunteer-request-body.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("volunteer-requests")
export class VolunteerRequestsController {
  constructor(private volunteerRequestService: VolunteerRequestsService) {}
  @ApiTags("Volunteer Requests")
  @ApiCreatedResponse({ type: VolunteerRequest })
  @Post()
  createVolunteerRequest(@Body() body: VolunteerRequestBodyDto) {
    return this.volunteerRequestService.createVolunteerRequest(body);
  }
}
