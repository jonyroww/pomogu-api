import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HelpTypes } from "./entities/help-types.entity";
import { HelpTypesRepository } from "./repositories/Help-types.repository";
import { HelpTypeBodyDto } from "./dto/help-type-body.dto";
import { HelpTypeIdDto } from "./dto/help-type-id.dto";
import { makeError } from "../common/errors/index";

@Injectable()
export class HelpTypesService {
  constructor(
    @InjectRepository(HelpTypes)
    private readonly helpTypesRepository: HelpTypesRepository
  ) {}

  async findAll(): Promise<HelpTypes[]> {
    const helpTypes = await this.helpTypesRepository.find({
      where: { deleted_at: null }
    });

    return helpTypes;
  }

  async createHelpType(body: HelpTypeBodyDto) {
    const helpType = this.helpTypesRepository.create(body);
    await this.helpTypesRepository.save(helpType);
    return helpType;
  }

  async getOneHelpType(params: HelpTypeIdDto) {
    const helpType = await this.helpTypesRepository.findOne({ id: params.id });
    if (helpType.deleted_at === null) {
      return helpType;
    } else {
      throw makeError("TYPE_WAS_DELETED");
    }
  }

  async updateHelpType(params: HelpTypeIdDto, body: HelpTypeBodyDto) {
    const helpType = await this.helpTypesRepository.findOne({ id: params.id });
    if (helpType.deleted_at === null) {
      helpType.title = body.title;
      await this.helpTypesRepository.save(helpType);
      return helpType;
    } else {
      throw makeError("TYPE_WAS_DELETED");
    }
  }

  async deleteHelpType(params: HelpTypeIdDto) {
    const helpType = await this.helpTypesRepository.findOne({ id: params.id });
    if (helpType.deleted_at === null) {
      helpType.deleted_at = new Date();
      await this.helpTypesRepository.save(helpType);
      return helpType;
    } else {
      throw makeError("TYPE_WAS_DELETED");
    }
  }
}
