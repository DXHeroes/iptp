import { Injectable } from '@nestjs/common';
import { FlowRepository } from './repository/flow.repository';

@Injectable()
export class FlowsService {
  constructor(private readonly flowRepository: FlowRepository) {}
}
