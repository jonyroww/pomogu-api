import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import dotenv from "dotenv";
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle("Pomogu API")
    .setDescription("The Pomogu API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT, process.env.HOST);
}
bootstrap();
