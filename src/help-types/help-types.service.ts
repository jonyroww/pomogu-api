import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { Repository } from "typeorm";

@Injectable()
export class HelpTypesService {
  constructor(
    @InjectRepository(HelpTypes)
    private readonly helpTypesRepository: Repository<HelpTypes>
  ) {}
  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesRepository.find();
  }
}
