import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractService } from '../shared/abstract.service'; // Assuming you have an AbstractService for common functionality
import { Subscribe } from './entities/subscribe.entity';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { Request } from 'express';
import { MagazineService } from 'src/magazine/magazine.service';

@Injectable()
export class SubscribeService extends AbstractService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly magazineService: MagazineService,

    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super(subscribeRepository); // Call the constructor of the AbstractService class
  }

  async create(
    createSubscribeDto: CreateSubscribeDto,
    request: Request,
  ): Promise<Subscribe> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    const jwt = request.headers.authorization.replace('Bearer ', '');
    const { id: userId } = await this.jwtService.verifyAsync(jwt);

    if (!userId) {
      throw new UnauthorizedException(
        'Authentication token is Expired, please login again',
      );
    }

    const user = await this.userService.findOne({ id: userId });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const subscription = new Subscribe();
    subscription.startTime = new Date();
    subscription.endTime = new Date();
    subscription.endTime.setMonth(subscription.endTime.getMonth() + 1);
    subscription.status = 'active';
    subscription.user = user;
    if (createSubscribeDto.magazineId) {
      const magazine = await this.magazineService.findOne({
        id: createSubscribeDto.magazineId,
      });
      if (!magazine) {
        throw new NotFoundException('Magazine not found');
      }
      subscription.magazine = magazine;
    }

    const savedSubscription = await this.subscribeRepository.save({
      ...subscription,
      createdBy: userId,
    });
    return savedSubscription;
  }

  async findAllSubscriptionsByUserId(userId: string): Promise<Subscribe[]> {
    const allSubscriptions = await this.subscribeRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'magazine'], // Eager load both user and magazine relations
    });

    return allSubscriptions;
  }

  async cancelSubscription(
    subscriptionId: string,
    request: Request,
  ): Promise<Subscribe> {
    // Extract user ID from authorization token in the request header
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    const jwt = request.headers.authorization.replace('Bearer ', '');
    const { id: userId } = await this.jwtService.verifyAsync(jwt);

    if (!userId) {
      throw new UnauthorizedException(
        'Authentication token is Expired, please login again',
      );
    }

    const user = await this.userService.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const subscription = await this.subscribeRepository.findOne({
      where: { id: subscriptionId },
      relations: ['user'], // Eager load the user relation
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.user || subscription.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to cancel this subscription',
      );
    }

    subscription.status = 'cancelled';
    subscription.isActive = false;

    return await this.subscribeRepository.save(subscription);
  }

  async findAllSubscriptionsByMagazineId(
    magazineId: string,
  ): Promise<Subscribe[]> {
    const allSubscriptions = await this.subscribeRepository.find({
      where: { magazine: { id: magazineId } },
      relations: ['user'], // Eager load both user and magazine relations
    });

    return allSubscriptions;
  }
}
