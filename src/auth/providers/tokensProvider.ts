import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class TokensProvider {
  constructor(private readonly jwtService: JwtService) {}

  private signToken<T>({
    sub,
    expiresIn,
    secret,
    payload,
  }: {
    sub: number;
    expiresIn: string;
    secret: string;
    payload: T;
  }) {
    return this.jwtService.signAsync(
      {
        id: sub,
        ...payload,
      },
      {
        secret: secret,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken({
        sub: user.id,
        expiresIn: '1h',
        secret: process.env.accessSecret,
        payload: user,
      }),
      this.signToken({
        sub: user.id,
        expiresIn: '7d',
        secret: process.env.refreshSecret,

        payload: { sub: user.id },
      }),
    ]);

    return { accessToken, refreshToken };
  }

  public async verifyToken(token: string) {
    const result = this.jwtService.verify(token, {
      secret: process.env.secret,
    });
    return result;
  }
}
