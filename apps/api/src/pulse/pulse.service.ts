import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pulse } from './entities/pulse.entity';
import { CreatePulseDto } from './dto/create-pulse.dto';
import { UpdatePulseDto } from './dto/update-pulse.dto';

@Injectable()
export class PulseService {
  constructor(
    @InjectRepository(Pulse)
    private pulseRepository: Repository<Pulse>,
  ) {}

  /**
   * Processes a new transmission (Pulse).
   * This is the core 'Handshake' between the user and the Black Box.
   */
  async createPulse(createPulseDto: CreatePulseDto): Promise<Pulse> {
    const { content, metadata } = createPulseDto;

    try {
      // 1. Initialize the record (The 'Flight Log' entry)
      const pulse = this.pulseRepository.create({
        contentEncrypted: content,
        metadata,
      });

      // 2. The Safety Anchor check (Crucial Ethical Middleware)
      // This happens locally before any AI APIs are called.
      const isCrisis = this.checkForCrisis(content);

      if (isCrisis) {
        pulse.aiEchoResponse =
          "The weight you're describing is too much for one person. My logic cannot carry this, but these humans can: [Resource Link]. Please stay with us.";
      } else {
        pulse.aiEchoResponse = this.generateEcho(content);
      }

      // 3. Commit to the 'Black Box'
      return await this.pulseRepository.save(pulse);
    } catch (error) {
      // Log error internally but throw user-friendly exception
      throw new InternalServerErrorException(
        'Transmission failed to commit to the Black Box. ::' +
          (error as Error).message,
      );
    }
  }

  /**
   * Retrieves all pulses from the Black Box.
   */
  async findAll(): Promise<Pulse[]> {
    try {
      return await this.pulseRepository.find({
        order: { timestamp: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve pulses from the Black Box. ::' +
          (error as Error).message,
      );
    }
  }

  /**
   * Retrieves a specific pulse by ID.
   */
  async findOne(id: string): Promise<Pulse> {
    try {
      const pulse = await this.pulseRepository.findOne({ where: { id } });
      if (!pulse) {
        throw new NotFoundException(
          `Pulse with ID ${id} not found in the Black Box.`,
        );
      }
      return pulse;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve pulse from the Black Box. ::' +
          (error as Error).message,
      );
    }
  }

  /**
   * Updates a pulse in the Black Box.
   */
  async update(id: string, updatePulseDto: UpdatePulseDto): Promise<Pulse> {
    try {
      const pulse = await this.findOne(id);

      if (updatePulseDto.content) {
        pulse.contentEncrypted = updatePulseDto.content;
        // Re-evaluate crisis check and AI response if content changed
        const isCrisis = this.checkForCrisis(updatePulseDto.content);
        if (isCrisis) {
          pulse.aiEchoResponse =
            "The weight you're describing is too much for one person. My logic cannot carry this, but these humans can: [Resource Link]. Please stay with us.";
        } else {
          pulse.aiEchoResponse = this.generateEcho(updatePulseDto.content);
        }
      }

      if (updatePulseDto.metadata) {
        pulse.metadata = { ...pulse.metadata, ...updatePulseDto.metadata };
      }

      return await this.pulseRepository.save(pulse);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to update pulse in the Black Box. ::' +
          (error as Error).message,
      );
    }
  }

  /**
   * Removes a pulse from the Black Box.
   */
  async remove(id: string): Promise<void> {
    try {
      const pulse = await this.findOne(id);
      await this.pulseRepository.remove(pulse);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to remove pulse from the Black Box. ::' +
          (error as Error).message,
      );
    }
  }

  /**
   * Scans content for high-risk markers.
   * In a production 'Realist' environment, this would use more advanced NLP.
   */
  private checkForCrisis(text: string): boolean {
    const keywords = ['give up', 'end it', 'hurting myself'];
    return keywords.some((word) => text.toLowerCase().includes(word));
  }

  /**
   * Generates the 'Empathetic Realist' response.
   * This voice avoids toxic positivity and focuses on 'The Witness' effect.
   */
  generateEcho(_content: string): string {
    // Phase 1: Hardcoded Realism
    // Phase 2: Connect to Gemini API here
    return 'Transmission received. The silence is a factual weight. You are still documenting, which means the system is still online.';
  }
}
