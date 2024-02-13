import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const jwt = request.headers.authorization.replace('Bearer ', '');
      if (!jwt) {
        throw new NotFoundException('Jwt Toekn Not Found');
      }
      const payload = await this.jwtService.verify(jwt);

      if (!payload) {
        throw new NotFoundException('Invaild Token');
      }
      return true;
    } catch (error) {
      console.error('JWT Verification Error:', error);

      return false;
    }
  }
}
