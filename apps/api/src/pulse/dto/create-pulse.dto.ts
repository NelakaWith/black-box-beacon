/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreatePulseDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsObject()
  @IsOptional()
  metadata?: {
    moodScore?: number;
    survivalCheck?: {
      hydrated: boolean;
      ate: boolean;
      slept: boolean;
    };
  };
}
