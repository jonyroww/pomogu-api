import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { HelpTypesRepository } from "./repositories/Help-types.repository";

@Injectable()
export class HelpTypesService {
  constructor(
    @InjectRepository(HelpTypes)
    private readonly helpTypesRepository: HelpTypesRepository
  ) {}
  @Transactional()
  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesRepository.find();
  }
}
