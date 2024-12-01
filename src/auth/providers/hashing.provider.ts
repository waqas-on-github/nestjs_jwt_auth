import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingProvider {
  public async hashPassword(password: string) {
    try {
      return await argon2.hash(password);
    } catch (error) {
      throw error;
    }
  }

  public async comparePassword(password: string, hashedPassword: string) {
    try {
      return await argon2.verify(hashedPassword, password);
    } catch (error) {
      throw error;
    }
  }
}
