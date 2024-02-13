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
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('subscribe')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) createSubscribeDto: CreateSubscribeDto,
    @Req() request: Request,
  ): Promise<Subscribe> {
    //TODO: I only handel subscrie next month ,if have time we can handel if click agin increase time after this and mor validation
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authentication token is missing');
    }
    const jwt = request.headers.authorization.replace('Bearer ', '');

    const { id } = await this.jwtService.verifyAsync(jwt);

    const user = await this.userService.findOne({ id });

    if (!id) {
      throw new UnauthorizedException(
        'Authentication token is Expired,please login again',
      );
    }
    createSubscribeDto.startTime = new Date();

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    createSubscribeDto.endTime = endDate;

    createSubscribeDto.userId = id;
    createSubscribeDto.status = 'active';

    return this.subscribeService.save({ ...createSubscribeDto, createdBy: id });
  }

  @Get()
  async getSubscribers() {
    const allSub = await this.subscribeService.find();
    return {
      subscribers: allSub,
    };
  }
}
