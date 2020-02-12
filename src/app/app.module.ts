import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationsModule } from "../organisations/organisations.module";
import { CitezenTypesModule } from "src/citezen-types/citezen-types.module";
import { HelpTypesModule } from "src/help-types/help-types.module";
import { ConfigModule } from "./../config/config.module";
import { VolunteerRequestsModule } from "../volunteer-requests/volunteer-requests.module";
import { PhotosModule } from "../photos/photos.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    OrganisationsModule,
    CitezenTypesModule,
    HelpTypesModule,
    ConfigModule,
    VolunteerRequestsModule,
    PhotosModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
