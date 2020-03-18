import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { VolunteerRequestsService } from "./volunteer-requests.service";
import { VolunteerRequest } from "./entities/Volunteer-request.entity";
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from "@nestjs/swagger";
import { VolunteerRequestBodyDto } from "./dto/volunteer-request-body.dto";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "src/users/entities/User.entity";
import { VolunteerRequestAuthBodyDto } from "./dto/auth-body.dto";

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

  @ApiTags("Volunteer Requests")
  @ApiCreatedResponse({ type: VolunteerRequest })
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Post("/auth")
  createVolunteerRequestAuth(
    @Body() body: VolunteerRequestAuthBodyDto,
    @GetUser() user: User
  ) {
    return this.volunteerRequestService.createVolunteerRequestAuth(body, user);
  }
}
