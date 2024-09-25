import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('port');
  const logger = app.get(LoggerService);

  app.use(helmet());

  app.setGlobalPrefix('api');

  app
    .listen(port)
    .then(() => logger.log_(`NestedJS server is listening on port ${port} 🚀`))
    .catch((err) => logger.error_('Failed to start server', err));
}
bootstrap();
