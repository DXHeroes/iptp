import { Controller, Get, Param } from '@nestjs/common';
import { BankService } from '../bank/bank.service';

@Controller('api/accounts')
export class AccountsController  {

  constructor(private readonly bankService: BankService){}
  
  @Get('/')
    async listAccounts() {
    return this.bankService.listAccounts();
  }

  @Get('/:id/transactions')
    async listTransactions(
      @Param('id') id: string,
    ) {
    return this.bankService.listTransactionsByAccountId(id);
  }
}
