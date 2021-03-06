import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../entity/transaction.entity';
import { Account } from '../../accounts/entity/account.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async createTransactions(
    account: Account,
    transactions: {
      id: string;
      amount: { value: string; currency: string };
      date: string;
      fromName: string;
      toName?: string;
      vs: string;
      tags?: string[];
    }[],
  ): Promise<Transaction[]> {
    const newTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const t = new Transaction();
      t.account = account;
      t.tsAmount = parseFloat(transaction.amount.value);
      t.currency = transaction.amount.currency;
      t.tags = transaction.tags;
      t.tsId = transaction.id;
      t.tsVS = transaction.vs;
      t.date = new Date(transaction.date);
      t.tsTo = transaction.toName;
      t.tsFrom = transaction.fromName;
      newTransactions.push(t);
    }
    return this.save(newTransactions);
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
    const t = new Transaction();
    t.account = account;
    t.tsAmount = Number(transaction.amount.value);
    t.currency = transaction.amount.currency;
    t.tags = [];
    t.tsId = transaction.id;
    t.tsVS = transaction.vs;
    t.date = new Date(transaction.date);
    t.tsTo = transaction.toName;
    t.tsFrom = transaction.fromName;
    return this.save(t);
  }

  async labelTransaction(
    account: Account,
    transaction: Transaction,
    tags: string[],
  ): Promise<Transaction> {
    const ftransaction = await this.findOne({
      where: { accountId: account.id },
    });
    ftransaction.tags = tags;
    return await this.save(ftransaction);
  }
}
