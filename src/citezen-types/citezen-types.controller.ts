import { Controller, Get } from "@nestjs/common";
import { CitezenTypesService } from "./citezen-types.service";
import { CitezenTypes } from "./entities/citezen-types.entity";

@Controller("citezen-types")
export class CitezenTypesController {
  constructor(private readonly citezenTypesService: CitezenTypesService) {}
  @Get()
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesService.findAll();
  }
}
