import { Test, TestingModule } from '@nestjs/testing';
import { StorageLocationsController } from './storage-locations.controller';

describe('StorageLocationsController', () => {
  let controller: StorageLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageLocationsController],
    }).compile();

    controller = module.get<StorageLocationsController>(StorageLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
