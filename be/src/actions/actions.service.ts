import { Injectable } from '@nestjs/common';
import { ActionRepository } from './repository/action.repository';

@Injectable()
export class ActionsService {
  constructor(private readonly actionRepository: ActionRepository) {}
}
