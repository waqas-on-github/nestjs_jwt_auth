import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class TokensProvider {
  constructor(private readonly jwtService: JwtService) {}

  public signToken<T>({
    userId,
    expiresIn,
    payload,
  }: {
    userId: number;
    expiresIn: string;
    payload: T;
  }) {
    return this.jwtService.signAsync(
      {
        id: userId,
        ...payload,
      },
      {
        secret: '123',
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken({ userId: user.id, expiresIn: '1h', payload: user }),
      this.signToken({
        userId: user.id,
        expiresIn: '7d',
        payload: { userId: user.id },
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
