import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { OrganisationPhoneNumber } from "../entities/OrganisationPhoneNumbers.entity";

@EntityRepository(OrganisationPhoneNumber)
export class OrganisationPhoneNumberRepository extends BaseRepository<
  OrganisationPhoneNumber
> {}
