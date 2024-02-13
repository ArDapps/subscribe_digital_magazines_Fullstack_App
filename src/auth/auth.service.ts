import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async user(request: Request) {
    const jwt = request.headers.authorization.replace('Bearer ', '');

    const { id } = await this.jwtService.verifyAsync(jwt);
    return this.userService.findOne({ id });
  }
}
