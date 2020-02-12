import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { PhotosService } from "./photos.service";
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import multer from "multer";
import uuid from "uuid/v4";
import mime from "mime";

@Controller("upload-photo")
export class PhotosController {
  constructor(private photosService: PhotosService) {}
  @ApiTags("Photos")
  @ApiCreatedResponse()
  @Post()
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: multer.diskStorage({
        destination: "photos",
        filename: (req, file, callback) => {
          const extension = file.mimetype;
          const filename = uuid() + "." + mime.getExtension(extension);
          callback(null, filename);
        }
      })
    })
  )
  uploadPhoto(@UploadedFile() photo) {
    console.log(photo);
  }
}
