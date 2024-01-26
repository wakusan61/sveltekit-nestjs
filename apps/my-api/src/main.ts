import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { patchNestJsSwagger } from 'nestjs-zod';
import { ZodValidationExceptionFilter } from './zod-validation-exception/zod-validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // グローバルエラーフィルターの設定
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ZodValidationExceptionFilter());

  // ZodからOpenAPIを設定
  patchNestJsSwagger();

  // OpenAPIの設定
  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // TODO:クロスオリジン設定をすること
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
