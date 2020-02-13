import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  HttpAdapterHost
} from "@nestjs/common";
import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";
import { MulterModule, ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import { join } from "path";
import { path } from "app-root-path";
import { AbstractHttpAdapter } from "@nestjs/core";

@Module({
  imports: [MulterModule.register({})],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
