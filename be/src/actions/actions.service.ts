import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { Flow } from '../flows/entity/flow.entity';
import { Transaction } from '../transactions/entity/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { Action } from './entity/action.entity';
import { ActionRepository } from './repository/action.repository';

@Injectable()
export class ActionsService {
  constructor(
    private readonly actionRepository: ActionRepository,
    private readonly transactionService: TransactionsService,
    private readonly accountsService: AccountsService,
  ) {}

  async apply(id: string): Promise<void> {
    const action = await this.actionRepository.findOne(id);

    const account = await this.accountsService.findOne();

    let transaction: Transaction;
    if (action.tsTo) {
      transaction = await this.transactionService.createTransactions(account, [
        {
          id: null,
          date: null,
          fromName: 'me',
          vs: null,
          amount: {
            value: action.tsAmount,
            currency: 'CZK',
          },
          toName: 'My Required Payment',
        },
      ])[0];
    }

    if (action.tag)
      this.transactionService.labelTransaction(account, transaction, [
        action.tag,
      ]);
  }

  async createAction(
    flow: Flow,
    tsTo: string,
    tsAmount: string,
    tsVS: string,
    tag: string,
    notification: boolean,
    priority: number,
  ): Promise<Action> {
    const a = new Action();
    a.flow = flow;
    a.tsTo = tsTo;
    a.tsAmount = tsAmount;
    a.tsVS = tsVS;
    a.tag = tag;
    a.notification = notification;
    a.priority = priority;
    return this.actionRepository.save(a);
  }
}
