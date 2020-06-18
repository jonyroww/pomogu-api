import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { HelpTypesService } from './help-types.service';
import { HelpTypes } from './entities/help-types.entity';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from '../common/guards/is-admin.guard';
import { HelpTypeBodyDto } from './dto/help-type-body.dto';
import { HelpTypeIdDto } from './dto/help-type-id.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('help-types')
export class HelpTypesController {
  constructor(private readonly helpTypesService: HelpTypesService) {}
  @ApiTags('HelpTypes')
  @ApiOkResponse({ type: () => HelpTypes })
  @Get()
  findAll(): Promise<HelpTypes[]> {
    return this.helpTypesService.findAll();
  }

  @ApiTags('HelpTypes')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: HelpTypes })
  @Post()
  createHelpType(@Body() body: HelpTypeBodyDto): Promise<HelpTypes> {
    return this.helpTypesService.createHelpType(body);
  }

  @ApiTags('HelpTypes')
  @ApiOkResponse({ type: HelpTypes })
  @Get('/:id')
  getOneHelpType(@Param() params: HelpTypeIdDto): Promise<HelpTypes> {
    return this.helpTypesService.getOneHelpType(params);
  }

  @ApiTags('HelpTypes')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: HelpTypes })
  @Put('/:id')
  updateHelpType(
    @Param() params: HelpTypeIdDto,
    @Body() body: HelpTypeBodyDto,
  ): Promise<HelpTypes> {
    return this.helpTypesService.updateHelpType(params, body);
  }

  @ApiTags('HelpTypes')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @Delete('/:id')
  deleteHelpType(@Param() params: HelpTypeIdDto) {
    return this.helpTypesService.deleteHelpType(params);
  }
}
