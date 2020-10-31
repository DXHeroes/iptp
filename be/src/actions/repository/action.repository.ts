import { EntityRepository, Repository } from 'typeorm';
import { Action } from '../entity/action.entity';

@EntityRepository(Action)
export class ActionRepository extends Repository<Action> {}
