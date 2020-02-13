import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { VolunteerRequest } from "../entities/Volunteer-request.entity";

@EntityRepository(VolunteerRequest)
export class UserRepository extends BaseRepository<VolunteerRequest> {}
