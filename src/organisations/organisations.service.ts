import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organisation } from "./entities/Organisation.entity";
import { Repository } from "typeorm";
import { QueryFilterDto } from "./dto/query-filter.dto";

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationsRepository: Repository<Organisation>
  ) {}
  findAll(params: QueryFilterDto): Promise<Organisation[]> {
    return this.organisationsRepository
      .createQueryBuilder("organisations")
      .innerJoinAndSelect("organisations.helpTypes", "helpTypes")
      .innerJoin("organisations.helpTypes", "organisation_help_types")
      .innerJoinAndSelect("organisations.citezenTypes", "citezenTypes")
      .innerJoin("organisations.citezenTypes", "organisation_citezen_types")
      .where("organisation_help_types.id IN (:...helpTypesId)", {
        helpTypesId: params.help_type_ids || []
      })
      .orWhere("organisation_citezen_types.id IN (:...citezenTypes)", {
        citezenTypes: params.citizen_type_ids || []
      })
      .take(params.limit)
      .skip(params.offset)
      .getMany();
  }
}
