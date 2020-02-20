import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganisationsModule } from "../organisations/organisations.module";
import { CitezenTypesModule } from "src/citezen-types/citezen-types.module";
import { HelpTypesModule } from "src/help-types/help-types.module";
import { ConfigModule } from "./../config/config.module";
import { VolunteerRequestsModule } from "../volunteer-requests/volunteer-requests.module";
import { PhotosModule } from "../photos/photos.module";
import { AuthModule } from "../auth/auth.module";
import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer";
import path from "path";
import appRootPath from "app-root-path";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: "smtps://socqr%40mail.ru:labado1996@smtp.mail.ru",
      defaults: { from: "socqr@mail.ru" },
      template: {
        dir: path.join(appRootPath.toString(), "templates"),
        adapter: new HandlebarsAdapter()
      }
    }),
    TypeOrmModule.forRoot(),
    OrganisationsModule,
    CitezenTypesModule,
    HelpTypesModule,
    ConfigModule,
    VolunteerRequestsModule,
    PhotosModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
