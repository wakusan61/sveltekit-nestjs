import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFile } from "fs/promises";
import { AppModule } from "../app.module";
import { patchNestJsSwagger } from "nestjs-zod";

const exportOpenAPIDocument = async () => {
  const app = await NestFactory.create(AppModule);
  // ZodからOpenAPIを設定
  patchNestJsSwagger();

  const documentBuilder = new DocumentBuilder()
    .setTitle('my-api')
    .setDescription('This is open api spec for generated request client')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  await writeFile(`${__dirname}/openapi-spec.json`, JSON.stringify(document, undefined, 2));
};

(async () => await exportOpenAPIDocument())();