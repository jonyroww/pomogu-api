import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Request } from "../entities/Request.entity";

@EntityRepository(Request)
export class RequestRepository extends BaseRepository<Request> {}
