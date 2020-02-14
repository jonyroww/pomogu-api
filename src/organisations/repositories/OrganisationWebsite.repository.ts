import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { OrganisationWebsite } from "../entities/OrganisationWebsite.entity";

@EntityRepository(OrganisationWebsite)
export class OrganisationWebsiteRepository extends BaseRepository<
  OrganisationWebsite
> {}
