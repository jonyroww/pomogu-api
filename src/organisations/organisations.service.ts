import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organisation } from "./entities/Organisation.entity";
import { Repository } from "typeorm";
import { QueryFilterDto } from "./dto/query-filter.dto";
import { GetOneQueryDto } from "./dto/get-one-query.dto";
import _ from "lodash";
import { makeError } from "../common/errors/index";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { OrganisationRepository } from "./repositories/Organisation.repository";

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationsRepository: OrganisationRepository
  ) {}

  @Transactional()
  findAll(params: QueryFilterDto): Promise<Organisation[]> {
    const qb = this.organisationsRepository.createQueryBuilder("organisations");

    qb.leftJoinAndSelect("organisations.helpTypes", "helpTypes")
      .leftJoinAndSelect("organisations.citezenTypes", "citezenTypes")
      .leftJoinAndSelect("organisations.phone_numbers", "phone_numbers")
      .leftJoinAndSelect("organisations.websites", "websites");

    if (
      !_.isEmpty(params.help_type_ids) ||
      !_.isEmpty(params.citizen_type_ids)
    ) {
      qb.where("FALSE");
    }

    if (!_.isEmpty(params.help_type_ids)) {
      qb.leftJoin("organisations.helpTypes", "organisation_help_types").orWhere(
        "organisation_help_types.id IN (:...helpTypesId)",
        {
          helpTypesId: params.help_type_ids
        }
      );
    }

    if (!_.isEmpty(params.citizen_type_ids)) {
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

  @Transactional()
  async findOne(params: GetOneQueryDto) {
    const organisation = await this.organisationsRepository.findOne(params.id);
    if (organisation) {
      return organisation;
    } else {
      throw makeError("NO_SUCH_ORGANISATION");
    }
  }
}
