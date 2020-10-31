import { Injectable } from '@nestjs/common';
import { User } from '../auth/entity/user.entity';
import { Account } from './entity/account.entity';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne() {
    return await this.accountRepository.findOne()
  }

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
    return this.accountRepository.createAccounts(user, accounts);
  }

  async getAccounts(): Promise<Account[]> {
    return this.accountRepository.getAccounts();
  }
}
