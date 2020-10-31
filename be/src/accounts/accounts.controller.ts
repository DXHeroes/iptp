import { Controller, Get, Param } from '@nestjs/common';
import { BankService } from '../bank/bank.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AccountsService } from './accounts.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(
    private readonly bankService: BankService, 
    private readonly transactionService: TransactionsService,
    private readonly accountsService: AccountsService,
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
    // TODO: enable for real world of corporate people
    // return this.bankService.listAccounts();
    const accs = await this.accountsService.list()

    return accs.map(a => {
      return {
        id: a.id,
        currency: a.currency,
        name: a.name,
        product: a.acNumber,
        servicer: { bankCode: "0300", countryCode: "CZ", bic: "0000" }
      }
    })
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
    const ts = await this.accountsService.list()
    
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
