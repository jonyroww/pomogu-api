import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import express from "express";
import { join } from "path";
import { path } from "app-root-path";
import dotenv from "dotenv";
import { initializeTransactionalContext } from "typeorm-transactional-cls-hooked";
dotenv.config();
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle("Pomogu API")
    .setDescription("The Pomogu API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.use(
    "/static/photos",
    express.static(join(path, "photos"), {
      index: false,
      extensions: ["jpeg", "png"],
      maxAge: 604800 * 1000
    })
  );
  await app.listen(process.env.PORT, process.env.HOST);
}
bootstrap();
