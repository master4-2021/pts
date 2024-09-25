import {
  HttpStatus,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { LoggerModule } from './modules/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './modules/database/database.module';
import { K2ApiModule } from './modules/k2Api/k2Api.module';
import { RequestContextMiddleware } from './common/middlewares/context/contextMiddleware';
import { CorrelationIdMiddleware } from './common/middlewares/correlationId';
import { AuthModule } from './modules/auth/auth.module';
import { LdapModule } from './modules/ldap/ldap.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationException } from './common/exceptions';
import { ErrorFilter } from './common/filters/error';
import { LoggingInterceptor } from './common/interceptors/logging';
import { TransformResponseInterceptor } from './common/interceptors/response';
import { ValidationError } from 'class-validator';
import { JwtModule } from './modules/jwt/jwt.module';
import { EncryptModule } from './modules/encrypt/encrypt.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    HealthModule,
    DatabaseModule,
    K2ApiModule,
    AuthModule,
    LdapModule,
    JwtModule,
    EncryptModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          exceptionFactory: (errors: ValidationError[]) =>
            new ValidationException(errors, HttpStatus.BAD_REQUEST),
        }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
