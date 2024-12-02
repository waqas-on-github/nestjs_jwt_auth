import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { SignUpProvider } from './signup.provider';
import { SignInProvider } from './signin.provider';
import { RefreshTokenDto } from '../dto/refresh.dto';
import { RefreshTokenProvider } from './refresh';

@Injectable()
export class AuthService {
  constructor(
    private readonly signUpProvider: SignUpProvider,
    // inject signIn provider
    private readonly signInProvider: SignInProvider,
    //inject refreshtoken provider
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}
  public signUp(signupDto: SignupDto) {
    return this.signUpProvider.signUp(signupDto);
  }
  public signIn(signInDto: SignInDto) {
    return this.signInProvider.singIn(signInDto);
  }
  public async generateRefreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refresh(refreshTokenDto);
  }
}
