import { Controller, Get, Param } from '@nestjs/common';
import { BankService } from '../bank/bank.service';
import { TransactionsService } from '../transactions/transactions.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(
    private readonly bankService: BankService, 
    private readonly transactionService: TransactionsService
  ) {}

  @Get('/')
  async listAccounts(): Promise<
    {
      id: string;
      currency: string;
      servicer: { bankCode: string; countryCode: string; bic: string };
      name: string;
      product: string;
    }[]
  > {
    return this.bankService.listAccounts();
  }

  @Get('/:id/transactions')
  async listTransactions(
    @Param('id') id: string,
  ): Promise<
    {
      id: string;
      amount: { value: number; currency: string };
      date: Date;
      fromName: string;
      toName: string;
    }[]
  > {
    // TODO: enable for real world
    // return this.bankService.listTransactionsByAccountId(id);
    const ts = await this.transactionService.list()
    
    return ts.map(t => { 
      return {
        id: t.id,
        amount: {
          value: t.tsAmount,
          currency: "CZK"
        },
        date: t.date,
        fromName: t.tsFrom,
        toName: t.tsTo
      }
    })
  }
}
