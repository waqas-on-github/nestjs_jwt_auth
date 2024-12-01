import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { SignUpProvider } from './providers/signup.provider';
import { SignInProvider } from './providers/signin.provider';
import { CheckUserProvider } from './providers/checkUserExists.provider';
import { HashingProvider } from './providers/hashing.provider';
import { TokensProvider } from './providers/tokenProvider';
import { JwtModule, JwtService } from '@nestjs/jwt';

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
  ],
  imports: [
    JwtModule.register({
      secret: 'secretKey', // You can move this to a config service later
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
