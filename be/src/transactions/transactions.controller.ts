import { Body, Controller, Post } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { BankService } from '../bank/bank.service';
import { FlowsService } from '../flows/flows.service';
import { TransactionsService } from './transactions.service';

@Controller('/api/transactions')
export class TransactionsController {
  constructor(
    private readonly bankService: BankService,
    private readonly transactionService: TransactionsService,
    private readonly accountsService: AccountsService,
    private readonly flowService: FlowsService,
  ) {}

  @Post('/')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async createTransaction(
    @Body()
    dto: {
      endToEndIdentification: string;
      instructionIdentification: string;
      amountValue: number;
      amountCurrency: string;
      debtorIban: string;
      creditorIban: string;
    },
  ): Promise<void> {
    const {
      endToEndIdentification,
      instructionIdentification,
      amountValue,
      amountCurrency,
      debtorIban,
      creditorIban,
    } = dto;
    const data = await this.bankService.createPayment({
      paymentIdentification: {
        endToEndIdentification,
        instructionIdentification,
      },
      amount: { value: amountValue, currency: amountCurrency },
      debtorIban,
      creditorIban,
    });
    const accounts = await this.accountsService.getAccounts();
    const transaction = await this.transactionService.createSingleTransaction(
      accounts[0],
      {
        id: data.paymentIdentification.instructionIdentification,
        amount: { value: String(amountValue), currency: amountCurrency },
        date: String(new Date().toLocaleDateString()),
        fromName: accounts[0].name,
        toName: accounts[1].name,
        vs: data.signInfo.signId,
      },
    );
    await this.flowService.matchTransaction(transaction.id);
  }
}
