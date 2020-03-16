import { Injectable } from "@nestjs/common";
import { User } from "./entities/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/User.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { OrganisationRepository } from "../organisations/repositories/Organisation.repository";
import { makeError } from "../common/errors/index";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { GetAllQueryDto } from "./dto/get-all-query.dto";
import { UserIdDto } from "./dto/user-id.dto";
import { createUserDto } from "./dto/create-user.dto";
import { ModerationStatus } from "../constants/ModerationStatus.enum";
import { UpdateUserDto } from "./dto/update-user-dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private helpTypesRepository: HelpTypesRepository,
    private citezenTypesRepository: CitezenTypesRepository,
    private organisationRepository: OrganisationRepository
  ) {}

  @Transactional()
  findAll(query: GetAllQueryDto) {
    return this.userRepository.find({
      where: { moderation_status: query.moderation_status }
    });
  }

  findOne(params: UserIdDto) {
    return this.userRepository.findOne({ id: params.id });
  }

  async createUser({
    organisation_ids,
    citizen_type_ids,
    help_type_ids,
    ...body
  }: createUserDto) {
    const user = this.userRepository.create(body);
    const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
    const citezenTypes = await this.citezenTypesRepository.findByIds(
      citizen_type_ids
    );
    const organisations = await this.organisationRepository.findByIds(
      organisation_ids
    );
    user.helpTypes = helpTypes;
    user.citezenTypes = citezenTypes;
    user.organisations = organisations;
    user.moderation_status = ModerationStatus.APPROVED;

    await this.userRepository.save(user);
    return user;
  }

  async updateUser(
    params: UserIdDto,
    {
      citizen_type_ids,
      organisation_ids,
      help_type_ids,
      ...body
    }: UpdateUserDto
  ) {
    const user = await this.userRepository.findOne({ id: params.id });
    const megreUser = this.userRepository.merge(user, body);

    if (help_type_ids) {
      const helpTypes = await this.helpTypesRepository.findByIds(help_type_ids);
      megreUser.helpTypes = helpTypes;
    }
    if (citizen_type_ids) {
      const citezenTypes = await this.citezenTypesRepository.findByIds(
        citizen_type_ids
      );
      megreUser.citezenTypes = citezenTypes;
    }
    if (organisation_ids) {
      const organisations = await this.organisationRepository.findByIds(
        organisation_ids
      );
      megreUser.organisations = organisations;
    }
  }
}
