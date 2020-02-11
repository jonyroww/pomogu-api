import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  Param
} from "@nestjs/common";
import { OrganisationsService } from "./organisations.service";
import { Organisation } from "./entities/Organisation.entity";
import { QueryFilterDto } from "./dto/query-filter.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetOneQueryDto } from "./dto/get-one-query.dto";

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

  @ApiOkResponse({ type: Organisation })
  @Get("/:id")
  findOne(@Param() params: GetOneQueryDto): Promise<Organisation> {
    return this.organisationsService.findOne(params);
  }
}
