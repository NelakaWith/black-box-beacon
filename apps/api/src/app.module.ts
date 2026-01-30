import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PulseModule } from './pulse/pulse.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'black_box_beacon',
      entities: [],
      synchronize: true, // Set to false in production
    }),
    PulseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
