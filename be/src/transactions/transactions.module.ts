import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository])],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
