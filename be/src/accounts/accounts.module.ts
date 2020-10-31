import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountRepository } from './repository/account.repository';
import { AccountsController } from './accounts.controller';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository]), BankModule],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
