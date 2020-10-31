import { Controller, Get, Param } from '@nestjs/common';
import { BankService } from '../bank/bank.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(private readonly bankService: BankService) {}

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
      amount: { value: string; currency: string };
      date: string;
      fromName: string;
      toName: string;
    }[]
  > {
    return this.bankService.listTransactionsByAccountId(id);
  }
}
