import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CitezenTypes } from "./entities/citezen-types.entity";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { CitezenTypesRepository } from "./repositories/Citezen-types.repository";

@Injectable()
export class CitezenTypesService {
  constructor(
    @InjectRepository(CitezenTypes)
    private readonly citezenTypesRepository: CitezenTypesRepository
  ) {}
  @Transactional()
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesRepository.find();
  }
}
