import { Module } from "@nestjs/common";
import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [MulterModule.register({})],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
