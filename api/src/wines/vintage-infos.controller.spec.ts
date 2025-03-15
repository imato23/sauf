import { Test, TestingModule } from '@nestjs/testing';
import { VintageInfosController } from './vintage-infos.controller';

describe('VintageInfosController', () => {
  let controller: VintageInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VintageInfosController],
    }).compile();

    controller = module.get<VintageInfosController>(VintageInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
