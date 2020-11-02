import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { BankModule } from './bank/bank.module';
import { FlowsModule } from './flows/flows.module';
import { ActionsModule } from './actions/actions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({ useClass: ConfigService }),
    AuthModule,
    AccountsModule,
    BankModule,
    FlowsModule,
    ActionsModule,
    TransactionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', './fe/build'),
    }),
  ],
  controllers: [AppController]
})
export class AppModule {}
