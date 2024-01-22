import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception-filter/http-exception-filter.filter';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // グローバルエラーフィルターの設定
  app.useGlobalFilters(new HttpExceptionFilter());

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
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
