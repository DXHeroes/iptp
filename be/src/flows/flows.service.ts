import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { AmountCondition } from './interface/amountCondition.enum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from 'lodash';
import { CreateFlowParams, FlowRepository } from './repository/flow.repository';
import { Flow } from './entity/flow.entity';
import { ActionsService } from '../actions/actions.service';
import { Transaction } from '../transactions/entity/transaction.entity';
import { InsertResult } from 'typeorm';

@Injectable()
export class FlowsService implements OnApplicationBootstrap {
  constructor(
    private readonly flowRepository: FlowRepository,
    private readonly transactionsService: TransactionsService,
    private readonly actionsService: ActionsService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const existingFlow = await this.flowRepository.findOne({
      where: { amount: '15000', category: 'INCOME', from: 'Applifting s.r.o.' },
    });
    if (!existingFlow) {
      const flow = await this.flowRepository.createSingleFlow({
        amount: '15000',
        amountCond: AmountCondition.MORE_THAN,
        category: 'INCOME',
        date: new Date(),
        from: 'Applifting s.r.o.',
        title: 'Monthly Income Flow',
        to: 'DX Heroes',
      });
      await this.actionsService.createAction(
        flow,
        'Prokop Simek',
        '10000',
        '420123123',
        'DEBT',
        false,
        0,
      );
    }
  }

  create(params: CreateFlowParams): Promise<InsertResult> {
    return this.flowRepository.createFlow(params);
  }

  list(): Promise<Flow[]> {
    return this.flowRepository.find();
  }

  getById(id: string): Promise<Flow> {
    return this.flowRepository.findOne(id);
  }

  async matchTransaction(transactionId: string): Promise<void> {
    const transaction = await this.transactionsService.findById(transactionId);

    const flows = await this.flowRepository.find();
    const applicableFlows: Flow[] = [];

    // FIXME: I'd never oterate in loop in real world - iˇd use sql query => :shame: :shame: :shame:
    for (const f of flows) {
      if (f.date && transaction.date != f.date) break;
      // if (f.from && transaction.tsFrom != f.from) break; // TODO: :troll:
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

  private isCategory(transaction: Transaction) {
    if (transaction) {
      return true; // :troll:
    }
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
