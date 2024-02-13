import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeService } from './subscribe.service';

describe('SubscribeService', () => {
  let service: SubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribeService],
    }).compile();

    service = module.get<SubscribeService>(SubscribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
