import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountRepository } from './repository/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  providers: [AccountsService],
})
export class AccountsModule {}
