import { Controller, Get } from "@nestjs/common";
import { HelpTypesService } from "./help-types.service";
import { HelpTypes } from "./entities/help-types.entity";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller("help-types")
export class HelpTypesController {
  constructor(private readonly helpTypesService: HelpTypesService) {}
  @ApiTags("HelpTypes")
  @ApiOkResponse({ type: HelpTypes })
  @Get()
  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesService.findAll();
  }
}
