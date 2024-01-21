import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * FIXME アクセスログ仮実装
 */
@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AccessLoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.url} ${res.statusCode} ${res.statusMessage ?? ""}`)
    next();
  }
}
