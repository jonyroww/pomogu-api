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
  UseGuards,
  Delete,
} from '@nestjs/common';
import { User } from './entities/User.entity';
import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { UserIdDto } from './dto/user-id.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { ModerationBodyDto } from './dto/moderation-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from '../common/guards/is-admin.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { UserWriteAccessGuard } from '../common/guards/user-write-access-guard';
import { UpdateUserParamsDto } from './dto/update-phone-params.dto';
import { ModerationAdminGuard } from '../common/guards/moderation-admin.guard';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags('Users')
  @ApiOkResponse({ type: User })
  @Get()
  findAll(@Query() query: GetAllQueryDto) {
    return this.usersService.findAll(query);
  }

  @ApiTags('Users')
  @ApiOkResponse({ type: User })
  @Get('/:id')
  findOne(@Param() params: UserIdDto) {
    return this.usersService.findOne(params);
  }

  @ApiTags('Users')
  @ApiCreatedResponse({ type: User })
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiTags('Users')
  @ApiCreatedResponse()
  @Put('/:id')
  updateUser(@Param() params: UserIdDto, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(params, body);
  }

  @ApiTags('Users')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Put('/:volunteerId/change-phone')
  updatePhoneNumber(
    @Body() body: UpdatePhoneNumberDto,
    @GetUser() user: User,
    @Param() params: UpdateUserParamsDto,
  ) {
    return this.usersService.updatePhoneNumber(body, user, params);
  }

  @ApiTags('Users')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  deleteUser(@Param() params: UserIdDto) {
    return this.usersService.deleteUser(params);
  }

  @ApiTags('Users')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), ModerationAdminGuard)
  @ApiBearerAuth()
  @Put('/:id/moderate')
  moderateUser(@Param() params: UserIdDto, @Body() body: ModerationBodyDto) {
    return this.usersService.moderateUser(params, body);
  }
}
