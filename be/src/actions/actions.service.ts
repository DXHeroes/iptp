import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { Flow } from '../flows/entity/flow.entity';
import { Transaction } from '../transactions/entity/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { Action } from './entity/action.entity';
import { ActionRepository } from './repository/action.repository';
import * as uuid from 'uuid';

@Injectable()
export class ActionsService {
  constructor(
    private readonly actionRepository: ActionRepository,
    private readonly transactionService: TransactionsService,
    private readonly accountsService: AccountsService,
  ) {}

  async apply(id: string, transaction: Transaction): Promise<void> {
    const action = await this.actionRepository.findOne(id);
    const account = await this.accountsService.findOne();

    if (!!action.tsTo) {
      const { reducedAmount } = await this.accountsService.updateBalance(
        account,
        action?.tsAmount,
        String(transaction.tsAmount),
      );
      await this.transactionService.createTransactions(account, [
        {
          id: uuid.v4(),
          date: new Date().toLocaleString(),
          fromName: account.name,
          vs: `VS${uuid.v4()}`,
          amount: {
            value: `-${reducedAmount}`,
            currency: 'CZK',
          },
          toName: action.tsTo,
          tags: [action.tag],
        },
      ]);
    }
  }

  async createAction(
    flow: Flow,
    tsTo: string,
    tsAmount: string,
    tsVS: string,
    tag: string,
    notification: boolean,
  ): Promise<Action> {
    const [actions, count] = await this.actionRepository.findAndCount();
    const a = new Action();
    a.flow = flow;
    a.tsTo = tsTo;
    a.tsAmount = tsAmount;
    a.tsVS = tsVS;
    a.tag = tag;
    a.notification = notification;
    a.priority = count + 1;
    return this.actionRepository.save(a);
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
