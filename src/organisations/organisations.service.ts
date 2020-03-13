import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organisation } from "./entities/Organisation.entity";
import { Repository } from "typeorm";
import { QueryFilterDto } from "./dto/query-filter.dto";
import { OrganisationIdDto } from "./dto/organisation-id.dto";
import _ from "lodash";
import { makeError } from "../common/errors/index";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { OrganisationRepository } from "./repositories/Organisation.repository";
import { OrganisationBodyDto } from "./dto/organisation-body.dto";
import { OrganisationPhoneNumberRepository } from "./repositories/OrganisationPhoneNumbers.repository";
import { OrganisationWebsiteRepository } from "./repositories/OrganisationWebsite.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { OrganisationUpdateBodyDto } from "./dto/organisation-update-body.dto";

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private organisationsRepository: OrganisationRepository,
    private organisationPhoneNumberRepository: OrganisationPhoneNumberRepository,
    private organisationWebsiteRepository: OrganisationWebsiteRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository
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
    qb.andWhere("organisations.deleted_at is null");

    return qb
      .take(params.limit)
      .skip(params.offset)
      .getMany();
  }

  @Transactional()
  async createOrganisation({
    websites,
    phone_numbers,
    help_type_ids,
    citizen_type_ids,
    ...body
  }: OrganisationBodyDto) {
    const organisation = this.organisationsRepository.create(body);
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids
    );
    organisation.helpTypes = helpTypes;
    organisation.citezenTypes = citezenTypes;
    await this.organisationsRepository.save(organisation);

    const newWebsitesList = websites.map(website => {
      return {
        url: website,
        organisation_id: organisation.id
      };
    });
    const newWebsites = this.organisationWebsiteRepository.create(
      newWebsitesList
    );
    await this.organisationWebsiteRepository.save(newWebsites);

    const newPhoneNumbersList = phone_numbers.map(phone_number => {
      return {
        phone_number: phone_number,
        organisation_id: organisation.id
      };
    });

    const newPhoneNumbers = this.organisationPhoneNumberRepository.create(
      newPhoneNumbersList
    );
    await this.organisationPhoneNumberRepository.save(newPhoneNumbers);

    return organisation;
  }

  async findOne(params: OrganisationIdDto) {
    const organisation = await this.organisationsRepository.findOne(params.id);
    if (organisation && organisation.deleted_at === null) {
      return organisation;
    } else {
      throw makeError("NO_SUCH_ORGANISATION");
    }
  }

  async updateOrganisation(
    {
      help_type_ids,
      citizen_type_ids,
      websites,
      phone_numbers,
      ...body
    }: OrganisationUpdateBodyDto,
    params: OrganisationIdDto
  ) {
    const organisation = await this.organisationsRepository.findOne(params.id);
    if (organisation && organisation.deleted_at === null) {
      const mergeOrganisation = this.organisationsRepository.merge(
        organisation,
        body
      );
      if (help_type_ids) {
        const helpTypes = await this.helpTypesRepository.findByIds(
          help_type_ids
        );
        mergeOrganisation.helpTypes = helpTypes;
      }
      if (citizen_type_ids) {
        const citezenTypes = await this.citezenTypesRepository.findByIds(
          citizen_type_ids
        );
        mergeOrganisation.citezenTypes = citezenTypes;
      }

      if (phone_numbers) {
        await this.organisationPhoneNumberRepository.delete({
          organisation_id: params.id
        });
        const newPhoneNumbersList = phone_numbers.map(phone_number => {
          return {
            phone_number: phone_number,
            organisation_id: organisation.id
          };
        });

        const newPhoneNumbers = this.organisationPhoneNumberRepository.create(
          newPhoneNumbersList
        );
        await this.organisationPhoneNumberRepository.save(newPhoneNumbers);
      }

      if (websites) {
        await this.organisationWebsiteRepository.delete({
          organisation_id: params.id
        });
        const newWebsitesList = websites.map(website => {
          return {
            url: website,
            organisation_id: organisation.id
          };
        });
        const newWebsites = this.organisationWebsiteRepository.create(
          newWebsitesList
        );
        await this.organisationWebsiteRepository.save(newWebsites);
      }

      await this.organisationsRepository.save(mergeOrganisation);
    } else {
      throw makeError("NO_SUCH_ORGANISATION");
    }
  }

  async deleteOrganisation(params: OrganisationIdDto) {
    const organisation = await this.organisationsRepository.findOne(params.id);
    if (organisation && organisation.deleted_at === null) {
      organisation.deleted_at = new Date();
      await this.organisationsRepository.save(organisation);
      return organisation;
    } else {
      throw makeError("NO_SUCH_ORGANISATION");
    }
  }
}
