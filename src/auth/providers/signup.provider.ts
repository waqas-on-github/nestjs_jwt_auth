import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { PrismaService } from 'src/prisma.service';
import { CheckUserProvider } from './checkUserExists.provider';
import { HashingProvider } from './hashing.provider';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SignUpProvider {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly checkUserProvider: CheckUserProvider,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signUp(signupDto: SignupDto) {
    try {
      const userExists = await this.checkUserProvider.checkUserByEmail(
        signupDto.email,
      );
      if (userExists) {
        throw new BadRequestException('user already exists ');
      }

      const hashedPassword = await this.hashingProvider.hashPassword(
        signupDto.password,
      );

      const user = await this.prismaService.user.create({
        data: {
          email: signupDto.email,
          password: hashedPassword,
          name: signupDto.name,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('user already exists');
      }
      // throw error
      throw error;
    }
  }
}
