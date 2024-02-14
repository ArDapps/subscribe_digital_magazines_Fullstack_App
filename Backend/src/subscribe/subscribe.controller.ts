import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

import { Subscribe } from './entities/subscribe.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { subscribe } from 'diagnostics_channel';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscribe')
@Controller('subscribe')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createSubscribeDto: CreateSubscribeDto,
    @Req() request: Request,
  ): Promise<Subscribe> {
    return this.subscribeService.create(createSubscribeDto, request);
  }

  @Post('/cancelSubscribe')
  async cancel(
    @Body('subscriptionId') subscriptionId: string, // Specify the key for the subscribeId in the request body
    @Req() request: Request,
  ): Promise<Subscribe> {
    return this.subscribeService.cancelSubscription(subscriptionId, request);
  }
  @Get('/MagazineSubscribers/:magazineId')
  async getSubscribers(@Param('magazineId') magazineId: string) {
    const subscribers =
      await this.subscribeService.findAllSubscriptionsByMagazineId(magazineId);
    return {
      subscribers,
    };
  }

  @Get('/userSubscribtion/:userId')
  async getUserSubscribers(@Param('userId') userId: string) {
    const subscribers =
      await this.subscribeService.findAllSubscriptionsByUserId(userId);
    return {
      subscribers,
    };
  }
}
