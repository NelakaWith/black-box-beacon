import { Controller, Post, Body } from '@nestjs/common';
import { PulseService } from './pulse.service';
import { CreatePulseDto } from './dto/create-pulse.dto';

@Controller('pulse')
export class PulseController {
  constructor(private readonly pulseService: PulseService) {}

  @Post('transmit')
  async transmit(@Body() createPulseDto: CreatePulseDto) {
    // The ValidationPipe ensures we only get here if the data is valid
    return this.pulseService.createPulse(createPulseDto);
  }

  // Potential Phase 2: Retrieve the 'Flight Log'
  // @Get(':id')
  // async getPulse(@Param('id') id: string) { ... }
}
