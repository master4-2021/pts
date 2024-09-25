import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs';
import { API_CONTEXT } from '../constants';
import { ResponseBody } from '../types';
import hideOrOmitDeep from 'src/utils/hideOrOmitFields';
import getRequestInfo from 'src/utils/requestInfo';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest() as Request;
    const target = ctx.getClass().name;
    const method = ctx.getHandler().name;
    const now = Date.now();

    this.logger.log_(`${req.method} ${req.path}`, API_CONTEXT);
    this.logger.log_(`Invoking "${method}" method...`, target);

    return next.handle().pipe(
      map((body: ResponseBody) => {
        this.logger.log_(`"${method}" method invoked successfully!`, target, {
          took: `${Date.now() - now} ms`,
          data: hideOrOmitDeep(body?.data, ['accessToken', 'refreshToken']),
        });
        this.logger.log_(
          `${req.method} ${req.path} successfully!`,
          API_CONTEXT,
          {
            request: getRequestInfo(req),
            response: {
              ...body,
              data: hideOrOmitDeep(body?.data, ['accessToken', 'refreshToken']),
            },
          },
        );
        return body;
      }),
    );
  }
}
