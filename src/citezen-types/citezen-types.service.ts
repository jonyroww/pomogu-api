import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CitezenTypes } from "./entities/citezen-types.entity";
import { Transactional } from "typeorm-transactional-cls-hooked";

@Injectable()
export class CitezenTypesService {
  constructor(
    @InjectRepository(CitezenTypes)
    private readonly citezenTypesRepository: Repository<CitezenTypes>
  ) {}
  @Transactional()
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesRepository.find();
  }
}
