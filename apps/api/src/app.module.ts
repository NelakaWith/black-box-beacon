import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PulseModule } from './pulse/pulse.module';

@Module({
  imports: [PulseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
