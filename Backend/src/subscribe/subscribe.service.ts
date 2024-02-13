import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractService } from '../shared/abstract.service'; // Assuming you have an AbstractService for common functionality
import { Subscribe } from './entities/subscribe.entity';

@Injectable()
export class SubscribeService extends AbstractService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
  ) {
    super(subscribeRepository); // Call the constructor of the AbstractService class
  }
}
