import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

describe('SubscribeController', () => {
  let controller: SubscribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribeController],
      providers: [SubscribeService],
    }).compile();

    controller = module.get<SubscribeController>(SubscribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
