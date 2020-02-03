import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationsModule } from "../organisations/organisations.module";

@Module({
  imports: [TypeOrmModule.forRoot(), OrganisationsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
