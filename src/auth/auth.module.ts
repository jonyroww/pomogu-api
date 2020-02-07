import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import {ConfigService} from "./../config/config.service"

@Module({
  imports:[JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET')
    }),
    inject: [ConfigService]
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
