import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CitezenTypes } from "./entities/citezen-types.entity";

@Injectable()
export class CitezenTypesService {
  constructor(
    @InjectRepository(CitezenTypes)
    private readonly citezenTypesRepository: Repository<CitezenTypes>
  ) {}
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesRepository.find();
  }
}
