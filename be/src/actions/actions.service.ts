import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { AccountRepository } from '../accounts/repository/account.repository';
import { Transaction } from '../transactions/entity/transaction.entity';
import { TransactionRepository } from '../transactions/repository/transaction.repository';
import { TransactionsService } from '../transactions/transactions.service';
import { ActionRepository } from './repository/action.repository';

@Injectable()
export class ActionsService {
  constructor(
    private readonly actionRepository: ActionRepository, 
    private readonly transactionService: TransactionsService,
    private readonly accountsService: AccountsService,
  ) {}

  async apply(id: string) {
    const action = await this.actionRepository.findOne(id)

    const account = await this.accountsService.findOne()

    let transaction: Transaction;
    if (action.tsTo) {
      transaction = await this.transactionService.createTransactions(account,
      [
        {
          id: null,
          date: null,
          fromName: "me",
          vs: null,
          amount: {
            value: action.tsAmount,
            currency: "CZK"
          },
          toName: "My Required Payment"
        }
      ])[0]
    }

    if (action.tag) this.transactionService.labelTransaction(account, transaction, [action.tag])
  }
}
