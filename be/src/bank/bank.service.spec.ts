import { Test, TestingModule } from '@nestjs/testing';
import { BankService } from './bank.service';

describe('BankService', () => {
  let service: BankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankService],
    }).compile();

    service = module.get<BankService>(BankService);
  });

  it('get new AT', async () => {
    const data = await service.getAccessToken()
    expect(data).toBeDefined();
  });

  it('list accounts', async () => {
    const data = await service.listAccounts()
    expect(data).toBeDefined();
  });


  it('list transactions', async () => {
    const data = await service.listTransactionsByAccountId("AA195E7DB499B4D9F48D46C208625FF53F2245F7")
    expect(data).toBeDefined();
  });

});
