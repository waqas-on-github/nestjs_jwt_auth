import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { PrismaService } from 'src/prisma.service';
import { SignUpProvider } from './signup.provider';
import { SignInProvider } from './signin.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    // inject signup provider
    private readonly signUpProvider: SignUpProvider,
    // inject signIn provider
    private readonly signInProvider: SignInProvider,
  ) {}
  public signUp(signupDto: SignupDto) {
    return this.signUpProvider.signUp(signupDto);
  }
  public signIn(signInDto: SignInDto) {
    return this.signInProvider.singIn(signInDto);
  }
}
