import { Test, TestingModule } from '@nestjs/testing';
import { WineService } from './wine.service';

describe('Wine2Service', () => {
  let service: WineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WineService],
    }).compile();

    service = module.get<WineService>(WineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
