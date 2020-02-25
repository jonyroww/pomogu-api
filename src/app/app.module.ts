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
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        defaults: {
          from: configService.get("EMAIL_FROM")
        },
        transport: configService.get("SMTP_URL"),
        template: {
          dir: path.join(appRootPath.toString(), "templates"),
          adapter: new HandlebarsAdapter()
        }
      }),
      inject: [ConfigService]
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
