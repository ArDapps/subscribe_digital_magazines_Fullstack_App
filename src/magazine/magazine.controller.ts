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
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('magazine')
export class MagazineController {
  constructor(
    private magazineService: MagazineService,
    private jwtService: JwtService,
  ) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post('create')
  async createMagazine(
    @Body(ValidationPipe) body: CreateMagazineDto,
    @Req() request: Request,
  ) {
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authentication token is missing');
    }
    const jwt = request.headers.authorization.replace('Bearer ', '');

    const { id } = await this.jwtService.verifyAsync(jwt);

    if (!id) {
      throw new UnauthorizedException(
        'Authentication token is Expired,please login again',
      );
    }
    return await this.magazineService.save({ ...body, createdBy: id });
  }

  @Get()
  async getMagazines() {
    return this.magazineService.find();
  }
}
