import { Controller, Get, Param } from '@nestjs/common';
import { BankService } from '../bank/bank.service';
import { AccountsService } from './accounts.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(
    private readonly bankService: BankService,
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
      balance: string;
    }[]
  > {
    // TODO: enable for real world of corporate people
    // return this.bankService.listAccounts();
    const accs = await this.accountsService.list();

    return accs.map(a => {
      return {
        id: a.id,
        currency: a.currency,
        name: a.name,
        product: a.acNumber,
        servicer: { bankCode: '0300', countryCode: 'CZ', bic: '0000' },
        balance: a.balance,
      };
    });
  }
}
