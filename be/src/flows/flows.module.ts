import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowsService } from './flows.service';
import { FlowRepository } from './repository/flow.repository';
import { FlowsController } from './flows.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { ActionsModule } from '../actions/actions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowRepository]),
    forwardRef(() => TransactionsModule),
    ActionsModule,
  ],
  providers: [FlowsService],
  controllers: [FlowsController],
  exports: [FlowsService],
})
export class FlowsModule {}
