import {
  Controller,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Post,
  Get,
  UseGuards
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { RequestsService } from "./requests.service";
import { ParamsValidationDto } from "./dto/create-request-params.dto";
import { BodyValidationDto } from "./dto/create-request-body.dto";
import { AuthGuard } from "@nestjs/passport";
import { AllRequestsReadAccessGuard } from "../common/guards/get-all-requests.guard";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("volunteers")
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post(":id/requests")
  @ApiTags("Requests")
  @ApiCreatedResponse()
  createRequest(
    @Body() body: BodyValidationDto,
    @Param() params: ParamsValidationDto
  ) {
    return this.requestsService.createRequest(body, params);
  }

  @Get(":id/requests")
  @UseGuards(AuthGuard("jwt"), AllRequestsReadAccessGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  getAllRequests() {
    return this.requestsService.getAllRequests();
  }
}
