import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configService } from '../config/config.service';
import { ConfigKeys } from '../config/configKeys.enum';
import { LinkedInStrategy } from './strategy/linkedin.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.get(ConfigKeys.JWT_SECRET, 'ultra-hard-to-guess'),
    }),
  ],
  providers: [AuthService, LinkedInStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
