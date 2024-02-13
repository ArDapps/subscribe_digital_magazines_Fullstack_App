import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../shared/abstract.service';
import { User } from 'src/user/user.entity';
@Injectable()
export class MagazineService extends AbstractService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) {
    super(magazineRepository);
  }

  async getUserMagazines(user: User): Promise<Magazine[]> {
    // Find the magazines associated with the user ID
    const magazines = await this.magazineRepository.find({
      where: { owner: user },
    });

    console.log(user);
    console.log(magazines);

    // Check if any magazines are associated with the user
    if (!magazines || magazines.length === 0) {
      throw new NotFoundException('User has no magazines');
    }

    // Return the list of magazines associated with the user
    return magazines;
  }
}
