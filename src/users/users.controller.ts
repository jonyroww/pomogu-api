import {
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put
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
import { UserIdDto } from "./dto/user-id.dto";
import { createUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user-dto";

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

  @ApiTags("Users")
  @ApiOkResponse({ type: User })
  @Get("/:id")
  findOne(@Param() params: UserIdDto) {
    return this.usersService.findOne(params);
  }

  @ApiTags("Users")
  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() body: createUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiTags("Users")
  @ApiCreatedResponse()
  @Put("/:id")
  updateUser(@Param() params: UserIdDto, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(params, body);
  }
}
