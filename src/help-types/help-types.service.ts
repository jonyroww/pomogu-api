import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

@Injectable()
export class HelpTypesService {
  constructor(
    @InjectRepository(HelpTypes)
    private readonly helpTypesRepository: Repository<HelpTypes>
  ) {}
  @Transactional()
  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesRepository.find();
  }
}
