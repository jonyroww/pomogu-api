import { Injectable } from "@nestjs/common";
import { User } from "./entities/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/User.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { makeError } from "../common/errors/index";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { GetAllQueryDto } from "./dto/get-all-query.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository
  ) {}

  @Transactional()
  findAll(query: GetAllQueryDto) {
    return this.userRepository.find({
      where: { moderation_status: query.moderation_status }
    });
  }
}
