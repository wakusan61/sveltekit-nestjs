import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { Request, Response } from 'express';

@Catch()
export class ZodValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ZodValidationExceptionFilter.name);
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    // TODO: HttpExceptionと同じ内容で実装、必要に応じて変更する
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      `${request.method} ${request.path} ${status} ${exception.message} ${
        exception.cause ?? ''
      }`,
    );
    // response を設定しないと、レスポンスを返さない
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
