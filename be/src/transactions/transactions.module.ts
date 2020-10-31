import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankModule } from '../bank/bank.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
    BankModule,
    AccountsModule,
  ],
  providers: [TransactionsService],
  exports: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
