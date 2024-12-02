import { BadRequestException, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenProvider {
  constructor(private readonly jwtservice: JwtService) {}

  public async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.jwtservice.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: process.env.secret,
        },
      );
      console.log(payload);
      return payload;
    } catch (error) {
      // Handle the error by throwing a proper NestJS exception
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
