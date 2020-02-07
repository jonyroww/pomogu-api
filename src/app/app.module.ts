import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationsModule } from "../organisations/organisations.module";
import { CitezenTypesModule } from "src/citezen-types/citezen-types.module";
import { HelpTypesModule } from "src/help-types/help-types.module";
import { ConfigModule } from "./../config/config.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    OrganisationsModule,
    CitezenTypesModule,
    HelpTypesModule,
    ConfigModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
