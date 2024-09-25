import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { CORRELATION_ID, TIMESTAMPS } from '../constants';
import { DateTime } from 'luxon';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const correlationId = uuidv4();
    req.headers[CORRELATION_ID] = correlationId;
    req.headers[TIMESTAMPS] = DateTime.now().toISO();
    next();
  }
}
