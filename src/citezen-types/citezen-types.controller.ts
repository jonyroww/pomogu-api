import { Controller, Get } from "@nestjs/common";
import { CitezenTypesService } from "./citezen-types.service";
import { CitezenTypes } from "./entities/citezen-types.entity";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller("citezen-types")
export class CitezenTypesController {
  constructor(private readonly citezenTypesService: CitezenTypesService) {}
  @ApiTags("CitezenTypes")
  @ApiOkResponse({ type: CitezenTypes })
  @Get()
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesService.findAll();
  }
}
