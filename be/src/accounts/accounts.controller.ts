import { Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post('/transactions')
  async createTransaction(
    @Param('endToEndIdentification') endToEndIdentification: string,
    @Param('instructionIdentification') instructionIdentification: string,
    @Param('amountValue') amountValue: number,
    @Param('amountCurrency') amountCurrency: string,
    @Param('debtorIban') debtorIban: string,
    @Param('creditorIban') creditorIban: string,
  ) {
    return this.bankService.createPayment({
      paymentIdentification: {
        endToEndIdentification,
        instructionIdentification,
      },
      amount: { value: amountValue, currency: amountCurrency },
      debtorIban,
      creditorIban,
    });
  }
}
