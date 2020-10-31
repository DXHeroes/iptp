import { Injectable } from '@nestjs/common';
import { CreateFlowParams, FlowRepository } from './repository/flow.repository';

@Injectable()
export class FlowsService {
  constructor(private readonly flowRepository: FlowRepository) {}

  create(params: CreateFlowParams) {
    return this.flowRepository.createFlow(params)
  }
}
