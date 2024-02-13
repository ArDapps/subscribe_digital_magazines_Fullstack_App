import { User } from './../user/user.entity';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from './auth.guard';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('register')
  async register(@Body(ValidationPipe) body: RegisterDto) {
    const { password_confirm, ...data } = body;
    if (body.password !== password_confirm) {
      throw new BadRequestException('Passwords Do Not Mattch');
    }

    const hashed_password = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed_password,
      createdBy: data.email,
      lastChangedBy: data.email,
    });
  }
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(email, password);

    const user = await this.userService.findOne({ email });

    console.log(user);
    if (!user && !user.isActive) {
      throw new NotFoundException(
        'User Not Found,please create a new user Or Deleted',
      );
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Cridentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Login Success',
      token: jwt,
    };
  }

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Put('user/updateInfo')
  async updateUserInfo(
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,

    @Req() request: Request,
  ) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const { id } = await this.jwtService.verifyAsync(jwt);

    await this.userService.update(id, { firstName, lastName, email });
    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('me')
  async userProfile(@Req() request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');

    console.log(jwt, 'jwt');

    const { id } = await this.jwtService.verifyAsync(jwt);

    const user = await this.userService.findOne({ id });

    console.log(user);
    if (!user) {
      throw new NotFoundException('User Not Found,please create a new user');
    }

    return {
      me: user,
    };
  }

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Put('user/updatePassword')
  async updatePassword(
    @Body('password') password: string,
    @Body('confirm_password') confirm_password: string,

    @Req() request: Request,
  ) {
    if (password != confirm_password) {
      throw new BadRequestException('Password don`t match!');
    }
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const { id } = await this.jwtService.verifyAsync(jwt);

    await this.userService.update(id, {
      password: await bcrypt.hash(password, 12),
    });
    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'User logged out',
    };
  }
}
