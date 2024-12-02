import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from './decorators/isPublic';
import { CurrentUser } from './decorators/currentUser';
import { User } from '@prisma/client';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('test')
  test2(@CurrentUser() user: User) {
    return user;
  }
  @Public()
  @Post('refresh')
  public refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.generateRefreshToken(refreshTokenDto);
  }
}
