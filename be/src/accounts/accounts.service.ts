import { Injectable } from '@nestjs/common';
import { User } from '../auth/entity/user.entity';
import { Account } from './entity/account.entity';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(): Promise<Account> {
    return await this.accountRepository.findOne();
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

  async updateBalance(
    account: Account,
    percentageAmount: string,
    transactionAmount: string,
  ): Promise<{ updatedAccount: Account; reducedAmount: number }> {
    const currentBalance = parseFloat(account.balance);
    const reducedAmount =
      (parseFloat(transactionAmount) * parseFloat(percentageAmount)) / 100;
    const newBalance = currentBalance - reducedAmount;
    const acc = await this.accountRepository.findOne({
      where: { acId: account.acId },
    });
    acc.balance = String(newBalance);
    const updatedAccount = await this.accountRepository.save(acc);
    return { updatedAccount, reducedAmount };
  }
}
