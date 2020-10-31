import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { ActionsService } from './actions.service';
import { ActionRepository } from './repository/action.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActionRepository]), TransactionsModule, AccountsModule],
  providers: [ActionsService],
  exports: [ActionsService],
})
export class ActionsModule {}
