import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { BankService } from '../bank/bank.service';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
    private readonly bankService: BankService,
  ) {}

  async getUserOnCallback(
    firstName: string,
    lastName: string,
    email: string,
    pictureUrl: string,
  ): Promise<User> {
    let user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      user = await this.userRepository.createUser(
        firstName,
        lastName,
        email,
        pictureUrl,
      );
    }

    // check accounts
    const existingAccounts = await this.accountsService.getAccounts();
    if (existingAccounts.length === 0) {
      await this.prefetchAccountsFromPSD2(user);
    }

    return user;
  }

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.getUserById(userId);
  }

  async prefetchAccountsFromPSD2(user: User): Promise<void> {
    const listedAccounts = await this.bankService.listAccounts();
    const createdAccounts = await this.accountsService.createAccounts(
      user,
      listedAccounts,
    );
    for (const acc of createdAccounts) {
      const transactions = await this.bankService.listTransactionsByAccountId(
        acc.acId,
      );
      if (transactions.length !== 0) {
        await this.transactionsService.createTransactions(acc, transactions);
      }
    }
  }

  async generateToken(userId: string): Promise<{ accessToken: string }> {
    const payload = { userId };
    const jwtid = uuid.v4();
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: 100 * 24 * 60 * 60 * 1000,
      jwtid,
    });
    return { accessToken: token };
  }
}
