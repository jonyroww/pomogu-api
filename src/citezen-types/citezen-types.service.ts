import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CitezenTypes } from "./entities/citezen-types.entity";
import { CitezenTypesRepository } from "./repositories/Citezen-types.repository";

@Injectable()
export class CitezenTypesService {
  constructor(
    @InjectRepository(CitezenTypes)
    private readonly citezenTypesRepository: CitezenTypesRepository
  ) {}

  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesRepository.find();
  }
}
