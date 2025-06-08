import { Test, TestingModule } from '@nestjs/testing';
import { BottleLogService } from './bottle-log.service';

describe('BottleLogyService', () => {
  let service: BottleLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BottleLogService],
    }).compile();

    service = module.get<BottleLogService>(BottleLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
