import { EntityRepository, Repository } from 'typeorm';
import { Action } from '../../actions/entity/action.entity';
import { Flow } from '../entity/flow.entity';
import { AmountCondition } from '../interface/amountCondition.enum';

@EntityRepository(Flow)
export class FlowRepository extends Repository<Flow> {

  async createFlow(params: CreateFlowParams) {
    console.log(params)
    await this.insert({ ...params })
  }

}


export type CreateFlowParams = {
  amount: string; 
  amountCond: AmountCondition; 
  category: string; 
  date: string; 
  from: string; 
  title: string; 
  to: string; 
  actions: Action[];
}