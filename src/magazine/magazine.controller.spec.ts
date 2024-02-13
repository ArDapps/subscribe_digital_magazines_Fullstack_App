import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';

describe('MagazineController', () => {
  let controller: MagazineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
      providers: [MagazineService],
    }).compile();

    controller = module.get<MagazineController>(MagazineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
