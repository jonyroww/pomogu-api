import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organisation } from "./entities/Organisation.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationsRepository: Repository<Organisation>
  ) {}
  findAll(limit: number, offset: number): Promise<Organisation[]> {
    return this.organisationsRepository.find({ take: limit, skip: offset });
  }
}
