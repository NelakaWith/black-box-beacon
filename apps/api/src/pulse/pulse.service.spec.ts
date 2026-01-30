import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PulseService } from './pulse.service';
import { Pulse } from './entities/pulse.entity';

describe('PulseService', () => {
  let service: PulseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PulseService,
        {
          provide: getRepositoryToken(Pulse),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PulseService>(PulseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
