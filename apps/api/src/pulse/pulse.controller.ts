import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PulseService } from './pulse.service';
import { CreatePulseDto } from './dto/create-pulse.dto';
import { UpdatePulseDto } from './dto/update-pulse.dto';

@Controller('pulse')
export class PulseController {
  constructor(private readonly pulseService: PulseService) {}

  @Post('transmit')
  async transmit(@Body() createPulseDto: CreatePulseDto) {
    // The ValidationPipe ensures we only get here if the data is valid
    return this.pulseService.createPulse(createPulseDto);
  }

  @Get()
  async findAll() {
    return this.pulseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pulseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePulseDto: UpdatePulseDto,
  ) {
    return this.pulseService.update(id, updatePulseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pulseService.remove(id);
  }
}
