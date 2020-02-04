import { Controller, Get } from "@nestjs/common";
import { OrganisationsService } from "./organisations.service";
import { Organisation } from "./entities/Organisation.entity";

@Controller("organisations")
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}
  @Get()
  findAll(): Promise<Organisation[]> {
    return this.organisationsService.findAll();
  }
}
