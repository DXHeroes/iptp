import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserOnCallback(
    firstName: string,
    lastName: string,
    email: string,
    pictureUrl: string,
  ): Promise<User> {
    let user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      user = await this.userRepository.createUser(
        firstName,
        lastName,
        email,
        pictureUrl,
      );
    }
    return user;
  }

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.getUserById(userId);
  }

  async generateToken(userId: string): Promise<{ accessToken: string }> {
    const payload = { userId };
    const jwtid = uuid.v4();
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: 100 * 24 * 60 * 60 * 1000,
      jwtid,
    });
    return { accessToken: token };
  }
}
