import { MiddlewareConsumer, Module, UseFilters } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { AccessLoggerMiddleware } from './access-logger/access-logger.middleware';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TodoRepository } from './lib/repository/todo.repository';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    TodoService,
    TodoRepository,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessLoggerMiddleware).forRoutes('/');
  }
}
