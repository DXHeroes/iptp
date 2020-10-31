import { Injectable } from '@nestjs/common';
import { Transaction } from './entity/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { Account } from '../accounts/entity/account.entity';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransactions(
    account: Account,
    transactions: {
      id: string;
      amount: { value: string; currency: string };
      date: string;
      fromName: string;
      toName: string;
      vs: string;
    }[],
  ): Promise<Transaction[]> {
    return this.transactionRepository.createTransactions(account, transactions);
  }
}