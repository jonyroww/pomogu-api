import {
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  UseGuards
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
import { PaginationFilterDto } from "../common/dto/pagination-filter.dto";
import { ModerationBodyDto } from "./dto/moderation-body.dto";
import { AuthGuard } from "@nestjs/passport";
import { IsAdminGuard } from "../common/guards/is-admin.guard";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags("Users")
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @Get()
  findAll(
    @Query() query: GetAllQueryDto,
    @Param() params: PaginationFilterDto
  ) {
    return this.usersService.findAll(query, params);
  }

  @ApiTags("Users")
  @ApiOkResponse({ type: User })
  @Get("/:id")
  findOne(@Param() params: UserIdDto) {
    return this.usersService.findOne(params);
  }

  @ApiTags("Users")
  @ApiCreatedResponse({ type: User })
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
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

  @ApiTags("Users")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @Put("/:id")
  deleteUser(@Param() params: UserIdDto) {
    return this.usersService.deleteUser(params);
  }

  @ApiTags("Users")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @Put("/:id")
  moderateUser(@Param() params: UserIdDto, @Body() body: ModerationBodyDto) {
    return this.usersService.moderateUser(params, body);
  }
}
