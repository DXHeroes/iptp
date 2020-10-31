import { Body, Controller, Get, Post } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { Action } from '../actions/entity/action.entity';
import { Flow } from './entity/flow.entity';
import { FlowsService } from './flows.service';
import { AmountCondition } from './interface/amountCondition.enum';

@Controller('api/flows')
export class FlowsController {
  constructor(private readonly service: FlowsService) {}

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
  ): Promise<InsertResult> {
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

  @Get('/')
  list(): Promise<Flow[]> {
    return this.service.list();
  }
}
