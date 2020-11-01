import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { AmountCondition } from './interface/amountCondition.enum';
import { CreateFlowParams, FlowRepository } from './repository/flow.repository';
import { Flow } from './entity/flow.entity';
import { ActionsService } from '../actions/actions.service';
import { Transaction } from '../transactions/entity/transaction.entity';

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
        amountCond: AmountCondition.EQUAL,
        category: 'INCOME',
        date: new Date(),
        from: 'Applifting s.r.o.',
        title: 'Monthly Income Flow',
        to: '953437/999',
      });
      await this.actionsService.createAction(
        flow,
        'Prokop Simek',
        '15',
        'VS420123',
        'DEBT',
        false,
      );
    }
  }

  async create(params: CreateFlowParams): Promise<Flow> {
    const flow = await this.flowRepository.createFlow(params);
    for (const action of params.actions) {
      await this.actionsService.createAction(
        flow,
        action.tsTo,
        action.tsAmount,
        action.tsVS,
        action.tag,
        action.notification,
      );
    }
    return flow;
  }

  list(): Promise<Flow[]> {
    return this.flowRepository.find();
  }

  getById(id: string): Promise<Flow> {
    return this.flowRepository.findOne(id);
  }

  async matchTransaction(transactionId: string): Promise<void> {
    const transaction = await this.transactionsService.findById(transactionId);
    const flows = await this.flowRepository.find({ relations: ['actions'] });
    const applicableFlows: Flow[] = [];
    // FIXME: I'd never iterate in loop in real world - i'd use sql query => :shame: :shame: :shame:
    for (const f of flows) {
      //if (f.date && transaction.date != f.date) break;
      // if (f.from && transaction.tsFrom != f.from) break; // TODO: :troll:
      if (f.to && transaction.tsTo != f.to) break;
      // if (
      //   f.amount &&
      //   !this.fulfillsCondition(transaction.tsAmount, f.amount, f.amountCond)
      // )
      //   break;
      // if (f.category && !this.isCategory(transaction)) break;
      applicableFlows.push(f);
    }
    const flowsByPriority = applicableFlows.sort(f => f.priority);

    for (const f of flowsByPriority) {
      const actionsByPriority = f.actions.sort(a => a.priority);
      for (const a of actionsByPriority) {
        await this.actionsService.apply(a.id, transaction);
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
