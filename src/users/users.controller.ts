import {
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Query
} from "@nestjs/common";
import { User } from "./entities/User.entity";
import { UsersService } from "./users.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { GetAllQueryDto } from "./dto/get-all-query.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags("Users")
  @ApiOkResponse({ type: User })
  @Get()
  findAll(@Query() query: GetAllQueryDto) {
    return this.usersService.findAll(query);
  }
}
