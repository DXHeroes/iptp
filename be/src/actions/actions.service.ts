import { Injectable } from '@nestjs/common';
import { ActionRepository } from './repository/action.repository';

@Injectable()
export class ActionsService {
  constructor(private readonly actionRepository: ActionRepository) {}

  async apply(id: string) {
    const action = await this.actionRepository.findOne(id)
    
    //TODO: apply action
  }
}
