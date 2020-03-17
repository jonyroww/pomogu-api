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
import bcrypt from "bcrypt";
import { PaginationFilterDto } from "../common/dto/pagination-filter.dto";
import { ModerationBodyDto } from "./dto/moderation-body.dto";

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
  async findAll(query: GetAllQueryDto, params: PaginationFilterDto) {
    let users;
    if (query.moderation_status) {
      users = await this.userRepository.find({
        where: { moderation_status: query.moderation_status, deleted_at: null }
      });
    } else {
      users = await this.userRepository.find({ where: { deleted_at: null } });
    }
    return users;
  }

  findOne(params: UserIdDto) {
    const user = this.userRepository.findOne({ id: params.id });
    if (!user) {
      throw makeError("USER_NOT_FOUND");
    }
    return user;
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    user.password = hashedPassword;
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
      password,
      ...body
    }: UpdateUserDto
  ) {
    const user = await this.userRepository.findOne({ id: params.id });
    if (!user) {
      throw makeError("USER_NOT_FOUND");
    }
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
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      megreUser.password = hashedPassword;
    }
    await this.userRepository.save(megreUser);
    return megreUser;
  }

  async deleteUser(params: UserIdDto) {
    const user = await this.userRepository.findOne({ id: params.id });
    if (!user) {
      throw makeError("USER_NOT_FOUND");
    } else {
      user.deleted_at = new Date();
      await this.userRepository.save(user);
      return user;
    }
  }

  async moderateUser(params: UserIdDto, body: ModerationBodyDto) {
    const user = await this.userRepository.findOne({ id: params.id });
    if (!user) {
      throw makeError("USER_NOT_FOUND");
    } else {
      user.moderation_status = body.moderation_status;
      await this.userRepository.save(user);
      return user;
    }
  }
}
