import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }
}
