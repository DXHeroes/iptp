import { EntityRepository, Repository } from 'typeorm';
import { Flow } from '../entity/flow.entity';

@EntityRepository(Flow)
export class FlowRepository extends Repository<Flow> {}
