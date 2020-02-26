import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import { UserRepository } from "./repositories/User.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
