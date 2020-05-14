import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { HelpTypes } from '../entities/help-types.entity';

@EntityRepository(HelpTypes)
export class HelpTypesRepository extends BaseRepository<HelpTypes> {}
