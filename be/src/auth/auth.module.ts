import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
