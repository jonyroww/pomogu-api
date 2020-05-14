import { Module } from '@nestjs/common';
import { CitezenTypesService } from './citezen-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitezenTypes } from './entities/citezen-types.entity';
import { CitezenTypesController } from './citezen-types.controller';
import { CitezenTypesRepository } from './repositories/Citezen-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CitezenTypes, CitezenTypesRepository])],
  controllers: [CitezenTypesController],
  providers: [CitezenTypesService],
})
export class CitezenTypesModule {}
