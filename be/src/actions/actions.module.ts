import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsService } from './actions.service';
import { ActionRepository } from './repository/action.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActionRepository])],
  providers: [ActionsService],
  exports: [ActionsService],
})
export class ActionsModule {}
