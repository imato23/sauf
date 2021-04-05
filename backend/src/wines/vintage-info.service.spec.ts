import { Test, TestingModule } from '@nestjs/testing';
import { VintageInfoService } from './vintage-info.service';

describe('VintageInfoService', () => {
  let service: VintageInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VintageInfoService],
    }).compile();

    service = module.get<VintageInfoService>(VintageInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
