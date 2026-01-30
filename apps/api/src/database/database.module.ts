import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Pulse } from '../pulse/entities/pulse.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_NAME'),
        entities: [Pulse],
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true', // Auto-syncs DB schema with entities. DISABLE IN PROD.
      }),
    }),
  ],
})
export class DatabaseModule {}
