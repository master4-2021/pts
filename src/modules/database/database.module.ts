import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get<string>('database.mssql.host'),
          port: configService.get<number>('database.mssql.port'),
          username: configService.get<string>('database.mssql.username'),
          password: configService.get<string>('database.mssql.password'),
          database: configService.get<string>('database.mssql.databaseName'),
          entities: [],
          synchronize:
            configService.get<string>('database.mssql.synchronize') === 'true',
          dropSchema:
            configService.get<string>('database.mssql.dropSchema') === 'true',
          autoLoadEntities: true,
          extra: {
            trustServerCertificate: true,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
