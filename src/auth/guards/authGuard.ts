import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    //inject jwt service to etract jwt token form request headers

    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    return true;
  }
}
