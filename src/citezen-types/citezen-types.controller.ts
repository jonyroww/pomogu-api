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
import { CitezenTypesService } from './citezen-types.service';
import { CitezenTypes } from './entities/citezen-types.entity';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CitezenTypeBodyDto } from './dto/citezen-type-body.dto';
import { CitezenTypeIdDto } from './dto/citezen-type-id.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminGuard } from '../common/guards/is-admin.guard';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('citezen-types')
export class CitezenTypesController {
  constructor(private readonly citezenTypesService: CitezenTypesService) {}
  @ApiTags('CitezenTypes')
  @ApiOkResponse({ type: () => CitezenTypes })
  @Get()
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesService.findAll();
  }

  @ApiTags('CitezenTypes')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CitezenTypes })
  @Post()
  createCitezenType(@Body() body: CitezenTypeBodyDto): Promise<CitezenTypes> {
    return this.citezenTypesService.createCitezenType(body);
  }

  @ApiTags('CitezenTypes')
  @ApiOkResponse({ type: () => CitezenTypes })
  @Get('/:id')
  getOneCitezenType(@Param() params: CitezenTypeIdDto): Promise<CitezenTypes> {
    return this.citezenTypesService.getOneCitezenType(params);
  }

  @ApiTags('CitezenTypes')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: () => CitezenTypes })
  @Put('/:id')
  updateCitezenType(
    @Param() params: CitezenTypeIdDto,
    @Body() body: CitezenTypeBodyDto,
  ): Promise<CitezenTypes> {
    return this.citezenTypesService.updateCitezenType(params, body);
  }

  @ApiTags('CitezenTypes')
  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @Delete('/:id')
  deleteCitezenType(@Param() params: CitezenTypeIdDto) {
    return this.citezenTypesService.deleteCitezenType(params);
  }
}
