import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { CitezenTypes } from "../entities/citezen-types.entity";

@EntityRepository(CitezenTypes)
export class CitezenTypesRepository extends BaseRepository<CitezenTypes> {}
