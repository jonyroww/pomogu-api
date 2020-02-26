import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { HelpTypesRepository } from "./repositories/Help-types.repository";

@Injectable()
export class HelpTypesService {
  constructor(
    @InjectRepository(HelpTypes)
    private readonly helpTypesRepository: HelpTypesRepository
  ) {}

  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesRepository.find();
  }
}
