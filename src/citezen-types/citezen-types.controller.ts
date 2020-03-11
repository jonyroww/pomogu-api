import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete
} from "@nestjs/common";
import { CitezenTypesService } from "./citezen-types.service";
import { CitezenTypes } from "./entities/citezen-types.entity";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { CreateCitezenTypeBodyDto } from "./dto/create-citezen-type-body.dto";
import { CitezenTypeIdDto } from "./dto/citezen-type-id.dto";
import { AuthGuard } from "@nestjs/passport";
import { IsAdminGuard } from "../common/guards/is-admin.guard";

@Controller("citizen-types")
export class CitezenTypesController {
  constructor(private readonly citezenTypesService: CitezenTypesService) {}
  @ApiTags("CitezenTypes")
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CitezenTypes })
  @Get()
  findAll(): Promise<CitezenTypes[]> {
    return this.citezenTypesService.findAll();
  }

  @ApiTags("CitezenTypes")
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CitezenTypes })
  @Post()
  createCitezenType(@Body() body: CreateCitezenTypeBodyDto) {
    return this.citezenTypesService.createCitezenType(body);
  }

  @ApiTags("CitezenTypes")
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CitezenTypes })
  @Get("/:id")
  getOneCitezenType(@Param() params: CitezenTypeIdDto) {
    return this.citezenTypesService.getOneCitezenType(params);
  }

  @ApiTags("CitezenTypes")
  @UseGuards(AuthGuard("jwt"), IsAdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  @Delete("/:id")
  deleteCitezenType(@Param() params: CitezenTypeIdDto) {
    return this.citezenTypesService.deleteCitezenType(params);
  }
}
