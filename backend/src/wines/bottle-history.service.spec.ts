import { Test, TestingModule } from '@nestjs/testing';
import { BottleHistoryService } from './bottle-history.service';

describe('BottleHistoryService', () => {
  let service: BottleHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BottleHistoryService],
    }).compile();

    service = module.get<BottleHistoryService>(BottleHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
