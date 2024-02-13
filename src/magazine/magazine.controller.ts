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
import { UUID } from 'crypto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';

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

  @Get('/:id')
  async getSingleMagazine(@Param('id') id: string) {
    return await this.magazineService.findOne({ id });
  }

  @Patch('/:id')
  async updateMagazine(
    @Param('id') id: string,
    @Body() updateMagazineDto: UpdateMagazineDto,
  ) {
    const updatedMagazine = await this.magazineService.update(
      id,
      updateMagazineDto,
    );
    if (updatedMagazine) {
      return {
        message: 'Magazine updated successfully',
        updatedMagazine,
      };
    } else {
      return {
        message: 'No magazine found with this id',
      };
    }
  }

  @Delete('/:id')
  async deleteMagazine(@Param('id') id: string) {
    const itemDeleted = await this.magazineService.delete(id);

    if (itemDeleted.affected === 1) {
      return {
        message: 'Item Deleted Sucessfully',
      };
    } else {
      return {
        message: 'No Item With this id',
      };
    }
  }
}
