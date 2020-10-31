import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { Account } from '../entity/account.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async createAccounts(
    user: User,
    accounts: {
      id: string;
      currency: string;
      servicer: { bankCode: string; countryCode: string; bic: string };
      name: string;
      product: string;
      balance: { amount: { value: string; currency: string } };
      identification: string;
    }[],
  ): Promise<Account[]> {
    const newAccounts: Account[] = [];
    for (const account of accounts) {
      const a = new Account();
      a.user = user;
      a.acId = account.id;
      a.currency = account.currency;
      a.name = account.name;
      a.balance = account.balance?.amount.value;
      a.acNumber = account.identification;
      newAccounts.push(a);
    }
    return this.save(newAccounts);
  }

  async getAccounts(): Promise<Account[]> {
    return this.find();
  }
}
