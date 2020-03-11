import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CitezenTypes } from "./entities/citezen-types.entity";
import { CitezenTypesRepository } from "./repositories/Citezen-types.repository";
import { CitezenTypeBodyDto } from "./dto/citezen-type-body.dto";
import { CitezenTypeIdDto } from "./dto/citezen-type-id.dto";
import { makeError } from "../common/errors/index";

@Injectable()
export class CitezenTypesService {
  constructor(
    @InjectRepository(CitezenTypes)
    private citezenTypesRepository: CitezenTypesRepository
  ) {}

  async findAll(): Promise<CitezenTypes[]> {
    const citezenTypes = await this.citezenTypesRepository.find();
    const notDeletedTypes = citezenTypes.filter(
      citezenType => citezenType.deleted_at === null
    );
    return notDeletedTypes;
  }

  async createCitezenType(body: CitezenTypeBodyDto) {
    const citezenType = this.citezenTypesRepository.create(body);
    await this.citezenTypesRepository.save(citezenType);
    return citezenType;
  }

  async getOneCitezenType(params: CitezenTypeIdDto) {
    const citezenType = await this.citezenTypesRepository.findOne({
      id: params.id
    });
    if (citezenType.deleted_at === null) {
      return citezenType;
    } else {
      throw makeError("TYPE_WAS_DELETED");
    }
  }

  async updateCitezenType(params: CitezenTypeIdDto, body: CitezenTypeBodyDto) {
    const citezenType = await this.citezenTypesRepository.findOne({
      id: params.id
    });
    if (citezenType.deleted_at === null) {
      citezenType.title = body.title;
      citezenType.updated_at = new Date();
      await this.citezenTypesRepository.save(citezenType);
      return citezenType;
    } else {
      throw makeError("TYPE_WAS_DELETED");
    }
  }

  async deleteCitezenType(params: CitezenTypeIdDto) {
    const citezenType = await this.citezenTypesRepository.findOne({
      id: params.id
    });
    if (citezenType.deleted_at === null) {
      citezenType.deleted_at = new Date();
      citezenType.updated_at = new Date();
      await this.citezenTypesRepository.save(citezenType);
      return citezenType;
    } else {
      throw makeError("TYPE_WAS_DELETED");
    }
  }
}
