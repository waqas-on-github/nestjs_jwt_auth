import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckUserProvider {
  constructor(private readonly prismaService: PrismaService) {}

  public async checkUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
