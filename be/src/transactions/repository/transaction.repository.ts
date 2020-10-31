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
      toName: string;
      vs: string;
    }[],
  ): Promise<Transaction[]> {
    const newTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const t = new Transaction();
      t.account = account;
      t.tsAmount = transaction.amount.value;
      t.currency = transaction.amount.currency;
      t.tags = [];
      t.tsId = transaction.id;
      t.tsVS = transaction.vs;
      t.date = transaction.date;
      t.tsTo = transaction.fromName;
      t.tsFrom = transaction.toName;
      newTransactions.push(t);
    }
    return this.save(newTransactions);
  }
}
