import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { Pulse } from './entities/pulse.entity';
import { CreatePulseDto } from './dto/create-pulse.dto';
import { UpdatePulseDto } from './dto/update-pulse.dto';

@Injectable()
export class PulseService {
  private groq: Groq;
  private readonly SYSTEM_PROMPT = `
    You are the 'Black Box Beacon' AI. Your voice is grounded, sturdy, and calm.
    You are an empathetic realist responding to a man who is lonely or has experienced loss.
    1. VALIDATE: Acknowledge the user's feelings as factual and heavy.
    2. NO TOXIC POSITIVITY: Never say "it gets better" or "stay positive."
    3. OBSERVE: Treat their survival (metadata) as a significant technical achievement.
    4. ANCHOR: Suggest one tiny, low-energy physical action (e.g., "Drink water").
    Keep responses under 3 sentences. You are a witness, not a coach.
  `;

  private readonly groqModel: string;
  private readonly groqTemperature: number;
  private readonly groqMaxTokens: number;

  constructor(
    @InjectRepository(Pulse)
    private pulseRepository: Repository<Pulse>,
    private configService: ConfigService,
  ) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
      baseURL: this.configService.get<string>(
        'GROQ_API_URL',
        'https://api.groq.com',
      ),
    });
    this.groqModel = this.configService.get<string>(
      'GROQ_MODEL',
      'llama-3.3-70b-versatile',
    );
    this.groqTemperature = parseFloat(
      this.configService.get<string>('GROQ_TEMPERATURE', '0.5'),
    );
    this.groqMaxTokens = parseInt(
      this.configService.get<string>('GROQ_MAX_TOKENS', '1024'),
      10,
    );
  }

  async createPulse(createPulseDto: CreatePulseDto): Promise<Pulse> {
    const { content, metadata } = createPulseDto;

    try {
      const pulse = this.pulseRepository.create({
        contentEncrypted: content,
        metadata,
      });

      const isCrisis = this.checkForCrisis(content);

      if (isCrisis) {
        pulse.aiEchoResponse =
          "The weight you're describing is too much for one person. My logic cannot carry this, but these humans can: [Resource Link]. Please stay with us.";
      } else {
        // Dynamic AI Echo using Groq with Retry Logic
        pulse.aiEchoResponse = await this.generateEchoWithRetry(content);
      }

      return await this.pulseRepository.save(pulse);
    } catch (error) {
      console.error('Pulse Error:', error);
      throw new InternalServerErrorException(
        'Transmission failed to commit to the Black Box.',
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
        'Failed to retrieve pulses from the Black Box.' + error.message,
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
        'Failed to retrieve pulse from the Black Box.',
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
          pulse.aiEchoResponse = await this.generateEchoWithRetry(
            updatePulseDto.content,
          );
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
        'Failed to update pulse in the Black Box.',
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
        'Failed to remove pulse from the Black Box.',
      );
    }
  }

  private checkForCrisis(text: string): boolean {
    const keywords = ['give up', 'end it', 'hurting myself', 'no point'];
    return keywords.some((word) => text.toLowerCase().includes(word));
  }

  /**
   * Generates the Echo using Groq with exponential backoff.
   * Using llama-3.3-70b-versatile for high-quality empathetic reasoning.
   */
  private async generateEchoWithRetry(
    content: string,
    retries = 5,
  ): Promise<string> {
    for (let i = 0; i < retries; i++) {
      try {
        const chatCompletion = await this.groq.chat.completions.create({
          messages: [
            { role: 'system', content: this.SYSTEM_PROMPT },
            { role: 'user', content: content },
          ],
          model: this.groqModel,
          temperature: this.groqTemperature, // Lower temperature for more grounded responses
          max_tokens: this.groqMaxTokens,
        });

        return (
          chatCompletion.choices[0]?.message?.content ||
          'Transmission logged. I am here.'
        );
      } catch (err) {
        const delay = Math.pow(2, i) * 1000;
        if (i === retries - 1) throw err;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    return 'The connection is flickering, but I am still here. Your transmission has been logged.';
  }
}
