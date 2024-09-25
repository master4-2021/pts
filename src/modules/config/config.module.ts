import { Module } from '@nestjs/common';
import { ConfigModule as NestJSConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    NestJSConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
