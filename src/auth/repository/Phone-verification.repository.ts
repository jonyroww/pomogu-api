import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PhoneVerification } from '../entities/Phone-verification.entity';

@EntityRepository(PhoneVerification)
export class PhoneVerificationRepository extends BaseRepository<
  PhoneVerification
> {}
