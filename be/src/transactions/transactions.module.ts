import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankModule } from '../bank/bank.module';
import { AccountsModule } from '../accounts/accounts.module';
import { FlowsModule } from '../flows/flows.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
    BankModule,
    AccountsModule,
    forwardRef(() => FlowsModule),
  ],
  providers: [TransactionsService],
  exports: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
