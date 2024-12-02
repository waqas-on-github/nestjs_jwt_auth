import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { SignUpProvider } from './providers/signup.provider';
import { SignInProvider } from './providers/signin.provider';
import { CheckUserProvider } from './providers/checkUserExists.provider';
import { HashingProvider } from './providers/hashing.provider';
import { TokensProvider } from './providers/tokensProvider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './stratiges/jwt.strategy';
import { RefreshTokenProvider } from './providers/refresh';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    SignUpProvider,
    SignInProvider,
    CheckUserProvider,
    HashingProvider,
    TokensProvider,
    JwtService,
    JwtStrategy,
    RefreshTokenProvider,
  ],
  imports: [JwtModule],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
