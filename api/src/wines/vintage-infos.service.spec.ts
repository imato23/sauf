import { Test, TestingModule } from '@nestjs/testing';
import { VintageInfosService } from './vintage-infos.service';

describe('VintageInfosService', () => {
  let service: VintageInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VintageInfosService],
    }).compile();

    service = module.get<VintageInfosService>(VintageInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
