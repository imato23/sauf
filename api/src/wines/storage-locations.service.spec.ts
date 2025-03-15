import { Test, TestingModule } from '@nestjs/testing';
import { StorageLocationsService } from './storage-locations.service';

describe('StorageLocationsService', () => {
  let service: StorageLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageLocationsService],
    }).compile();

    service = module.get<StorageLocationsService>(StorageLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
