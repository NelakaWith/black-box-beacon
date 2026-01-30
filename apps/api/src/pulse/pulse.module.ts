import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PulseController } from './pulse.controller';
import { PulseService } from './pulse.service';
import { Pulse } from './entities/pulse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pulse])],
  controllers: [PulseController],
  providers: [PulseService],
})
export class PulseModule {}
