import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Action } from '../actions/entity/action.entity';
import { Flow } from './entity/flow.entity';
import { FlowsService } from './flows.service';
import { AmountCondition } from './interface/amountCondition.enum';

@Controller('api/flows')
export class FlowsController {
  constructor(private readonly service: FlowsService) {}

  @Get('/')
  list(): Promise<Flow[]> {
    return this.service.list();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Flow> {
    return this.service.getById(id);
  }

  @Post('/create')
  createFlow(
    @Body()
    dto: {
      amount: string;
      amountCond: AmountCondition;
      category: string;
      date: Date;
      from: string;
      title: string;
      to: string;
      actions: Action[];
    },
  ): Promise<Flow> {
    const {
      amount,
      amountCond,
      category,
      date,
      from,
      title,
      to,
      actions,
    } = dto;
    return this.service.create({
      amount,
      amountCond,
      category,
      date,
      from,
      title,
      to,
      actions,
    });
  }
}
