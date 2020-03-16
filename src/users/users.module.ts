import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import { UserRepository } from "./repositories/User.repository";
import { HelpTypesRepository } from "../help-types/repositories/Help-types.repository";
import { CitezenTypesRepository } from "../citezen-types/repositories/Citezen-types.repository";
import { OrganisationRepository } from "../organisations/repositories/Organisation.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      HelpTypesRepository,
      CitezenTypesRepository,
      OrganisationRepository
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
