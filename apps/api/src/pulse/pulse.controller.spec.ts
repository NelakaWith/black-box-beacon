import { Test, TestingModule } from '@nestjs/testing';
import { PulseController } from './pulse.controller';
import { PulseService } from './pulse.service';

describe('PulseController', () => {
  let controller: PulseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PulseController],
      providers: [
        {
          provide: PulseService,
          useValue: {
            createPulse: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PulseController>(PulseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
