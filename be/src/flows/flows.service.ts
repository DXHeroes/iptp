import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { AmountCondition } from './interface/amountCondition.enum';
//import assertNever from 'assert-never';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from 'lodash';
import { CreateFlowParams, FlowRepository } from './repository/flow.repository';
import { Flow } from './entity/flow.entity';
import { ActionsService } from '../actions/actions.service';

@Injectable()
export class FlowsService {
  constructor(
    private readonly flowRepository: FlowRepository,
    private readonly transactionsService: TransactionsService,
    private readonly actionsService: ActionsService,
  ) {}

  create(params: CreateFlowParams) {
    return this.flowRepository.createFlow(params);
  }

  async matchTransaction(transactionId: string) {
    const transaction = await this.transactionsService.findById(transactionId);

    const flows = await this.flowRepository.find();
    const applicableFlows: Flow[] = [];

    for (const f of flows) {
      if (f.date && transaction.date != f.date) break;
      if (f.from && transaction.tsFrom != f.from) break;
      if (f.to && transaction.tsTo != f.to) break;
      if (
        f.amount &&
        !this.fulfillsCondition(transaction.tsAmount, f.amount, f.amountCond)
      )
        break;
      if (f.category && !this.isCategory(transaction)) break;
      applicableFlows.push(f);
    }

    const flowsByPriority = applicableFlows.sort(f => f.priority);

    for (const f of flowsByPriority) {
      const actionsByPriority = f.actions.sort(a => a.priority);

      for (const a of actionsByPriority) {
        await this.actionsService.apply(a.id);
      }
    }

    return;
  }

  private isCategory(transaction) {
    return true; // :troll:
  }

  private fulfillsCondition(
    tsAmount: number,
    flowAmount: number,
    cond: AmountCondition,
  ) {
    switch (cond) {
      case AmountCondition.EQUAL:
        return tsAmount == flowAmount;
      case AmountCondition.LESS_THAN:
        return tsAmount < flowAmount;
      case AmountCondition.LESS_THAN_OR_EQUAL:
        return tsAmount <= flowAmount;
      case AmountCondition.MORE_THAN:
        return tsAmount > flowAmount;
      case AmountCondition.MORE_THAN_OR_EQUAL:
        return tsAmount >= flowAmount;
      default:
        return;
      //return assertNever(cond);
    }
  }
}
