import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Query
} from "@nestjs/common";
import { OrganisationsService } from "./organisations.service";
import { Organisation } from "./entities/Organisation.entity";
import { PaginationFilterDto } from "../common/dto/pagination-filter.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("organisations")
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}
  @Get()
  findAll(@Query() params: PaginationFilterDto): Promise<Organisation[]> {
    return this.organisationsService.findAll(params.limit, params.offset);
  }
}
