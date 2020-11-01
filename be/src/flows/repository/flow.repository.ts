import { EntityRepository, Repository } from 'typeorm';
import { Action } from '../../actions/entity/action.entity';
import { Flow } from '../entity/flow.entity';
import { AmountCondition } from '../interface/amountCondition.enum';

@EntityRepository(Flow)
export class FlowRepository extends Repository<Flow> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async createFlow(params: CreateFlowParams) {
    const [flow, count] = await this.findAndCount();
    const f = new Flow();
    f.amount = Number(params.amount.split(' ')[0]);
    f.amountCond = params.amountCond;
    f.category = params.category;
    f.date = params.date ? params.date : new Date();
    f.from = params.from;
    f.title = params.title;
    f.to = params.to;
    f.priority = count + 1;
    return await this.save(f);
  }

  async createSingleFlow(params: CreateFlowParams): Promise<Flow> {
    const [flow, count] = await this.findAndCount();
    const f = new Flow();
    f.amount = Number(params.amount);
    f.amountCond = params.amountCond;
    f.category = params.category;
    f.date = new Date(params.date);
    f.from = params.from;
    f.title = params.title;
    f.to = params.to;
    f.priority = count + 1;
    return this.save(f);
  }
}

export type CreateFlowParams = {
  amount: string;
  amountCond: AmountCondition;
  category: string;
  date: Date;
  from: string;
  title: string;
  to: string;
  actions?: Action[];
};
