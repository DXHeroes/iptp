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
      tags?: string[];
    }[],
  ): Promise<Transaction[]> {
    return await this.transactionRepository.createTransactions(
      account,
      transactions,
    );
  }

  findById(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne(id);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findAcc(id: string): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { accountId: id } });
  }

  async createSingleTransaction(
    account: Account,
    transaction: {
      id: string;
      amount: { value: string; currency: string };
      date: string;
      fromName: string;
      toName: string;
      vs: string;
    },
  ): Promise<Transaction> {
    return this.transactionRepository.createSingleTransaction(
      account,
      transaction,
    );
  }

  async labelTransaction(
    account: Account,
    transaction: Transaction,
    tags: string[],
  ): Promise<Transaction> {
    return await this.transactionRepository.labelTransaction(
      account,
      transaction,
      tags,
    );
  }

  async list(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }
}
