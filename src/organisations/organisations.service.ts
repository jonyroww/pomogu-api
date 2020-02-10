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
    const qb = this.organisationsRepository.createQueryBuilder("organisations");

    qb.leftJoinAndSelect("organisations.helpTypes", "helpTypes")
      .leftJoinAndSelect("organisations.citezenTypes", "citezenTypes")
      .where("1=1");

    if (params.help_type_ids && params.help_type_ids.length != 0) {
      qb.leftJoin("organisations.helpTypes", "organisation_help_types").orWhere(
        "organisation_help_types.id IN (:...helpTypesId)",
        {
          helpTypesId: params.help_type_ids
        }
      );
    }

    if (params.citizen_type_ids && params.citizen_type_ids.length != 0) {
      qb.leftJoin(
        "organisations.citezenTypes",
        "organisation_citezen_types"
      ).orWhere("organisation_citezen_types.id IN (:...citezenTypes)", {
        citezenTypes: params.citizen_type_ids
      });
    }

    return qb
      .take(params.limit)
      .skip(params.offset)
      .getMany();
  }
}
