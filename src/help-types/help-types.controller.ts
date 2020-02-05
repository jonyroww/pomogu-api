import { Controller, Get } from "@nestjs/common";
import { HelpTypesService } from "./help-types.service";
import { HelpTypes } from "./entities/help-types.entity";

@Controller("help-types")
export class HelpTypesController {
  constructor(private readonly helpTypesService: HelpTypesService) {}
  @Get()
  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesService.findAll();
  }
}
