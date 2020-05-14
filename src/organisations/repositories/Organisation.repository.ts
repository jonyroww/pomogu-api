import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Organisation } from '../entities/Organisation.entity';

@EntityRepository(Organisation)
export class OrganisationRepository extends BaseRepository<Organisation> {}
