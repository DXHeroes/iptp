import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Action } from '../actions/entity/action.entity';
import { FlowsService } from './flows.service';
import { AmountCondition } from './interface/amountCondition.enum';

@Controller('api/flows')
export class FlowsController {
  constructor(private readonly service: FlowsService){}

  @Post("/create")
  createFlow(
    @Body("amount") amount: string,
    @Body("amountCond") amountCond: AmountCondition,
    @Body("category") category: string,
    @Body("date") date: string,
    @Body("from") from: string,
    @Body("title") title: string,
    @Body("to") to: string,
    @Body("actions") actions: Action[],
  ) {
    return this.service.create({
      amount,
      amountCond,
      category,
      date,
      from,
      title,
      to,
      actions
    })
  }

  @Get("/")
  list() {
    return this.service.list()
  }

}
