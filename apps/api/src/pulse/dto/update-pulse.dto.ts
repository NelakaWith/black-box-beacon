import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdatePulseDto {
  @IsString()
  @IsOptional()
  content?: string;

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
