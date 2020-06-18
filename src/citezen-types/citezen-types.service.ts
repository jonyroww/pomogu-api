import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitezenTypes } from './entities/citezen-types.entity';
import { CitezenTypesRepository } from './repositories/Citezen-types.repository';
import { CitezenTypeBodyDto } from './dto/citezen-type-body.dto';
import { CitezenTypeIdDto } from './dto/citezen-type-id.dto';
import { makeError } from '../common/errors/index';

@Injectable()
export class CitezenTypesService {
  constructor(
    @InjectRepository(CitezenTypes)
    private citezenTypesRepository: CitezenTypesRepository,
  ) {}

  async findAll(): Promise<CitezenTypes[]> {
    const citezenTypes = await this.citezenTypesRepository.find({
      where: { deleted_at: null },
    });
    return citezenTypes;
  }

  async createCitezenType(body: CitezenTypeBodyDto): Promise<CitezenTypes> {
    const citezenType = this.citezenTypesRepository.create(body);
    await this.citezenTypesRepository.save(citezenType);
    return citezenType;
  }

  async getOneCitezenType(params: CitezenTypeIdDto): Promise<CitezenTypes> {
    const citezenType = await this.citezenTypesRepository.findOne({
      id: params.id,
    });
    if (citezenType.deleted_at === null) {
      return citezenType;
    } else {
      throw makeError('TYPE_WAS_DELETED');
    }
  }

  async updateCitezenType(
    params: CitezenTypeIdDto,
    body: CitezenTypeBodyDto,
  ): Promise<CitezenTypes> {
    const citezenType = await this.citezenTypesRepository.findOne({
      id: params.id,
    });
    if (citezenType.deleted_at === null) {
      citezenType.title = body.title;
      await this.citezenTypesRepository.save(citezenType);
      return citezenType;
    } else {
      throw makeError('TYPE_WAS_DELETED');
    }
  }

  async deleteCitezenType(params: CitezenTypeIdDto) {
    const citezenType = await this.citezenTypesRepository.findOne({
      id: params.id,
    });
    if (!citezenType) {
      throw makeError('TYPE_WAS_DELETED');
    } else {
      await this.citezenTypesRepository.delete({
        id: params.id,
      });
      return;
    }
  }
}
