import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "./../config/config.service";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import { PhoneVerificationRepository } from "./repository/Phone-verification.repository";
import { UserRepository } from "../users/repositories/User.repository";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET")
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      PhoneVerification,
      PhoneVerificationRepository,
      UserRepository
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
