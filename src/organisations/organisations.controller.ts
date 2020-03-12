import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards
} from "@nestjs/common";
import { OrganisationsService } from "./organisations.service";
import { Organisation } from "./entities/Organisation.entity";
import { QueryFilterDto } from "./dto/query-filter.dto";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { OrganisationIdDto } from "./dto/organisation-id.dto";
import { OrganisationBodyDto } from "./dto/organisation-body.dto";
import { OrganisationUpdateBodyDto } from "./dto/organisation-update-body.dto";
import { AuthGuard } from "@nestjs/passport";
import { IsAdminGuard } from "../common/guards/is-admin.guard";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("organisations")
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}
  @ApiTags("Organisations")
  @ApiOkResponse({ type: Organisation })
  @Get()
  findAll(@Query() params: QueryFilterDto): Promise<Organisation[]> {
    return this.organisationsService.findAll(params);
  }

  @ApiCreatedResponse()
  @Post()
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  createOrganisation(@Body() body: OrganisationBodyDto) {
    return this.organisationsService.createOrganisation(body);
  }

  @ApiOkResponse({ type: Organisation })
  @Get("/:id")
  findOne(@Param() params: OrganisationIdDto): Promise<Organisation> {
    return this.organisationsService.findOne(params);
  }

  @ApiOkResponse()
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @Put("/:id")
  updateOrganisation(
    @Param() params: OrganisationIdDto,
    @Body() body: OrganisationUpdateBodyDto
  ) {
    return this.organisationsService.updateOrganisation(body, params);
  }

  @ApiOkResponse()
  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  deleteOrganisation(@Param() params: OrganisationIdDto) {
    return this.organisationsService.deleteOrganisation(params);
  }
}
