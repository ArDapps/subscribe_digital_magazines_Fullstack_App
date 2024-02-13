import { Injectable } from '@nestjs/common';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { AbstractService } from 'src/shared/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { Repository } from 'typeorm';
@Injectable()
export class MagazineService extends AbstractService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) {
    super(magazineRepository);
  }
}
