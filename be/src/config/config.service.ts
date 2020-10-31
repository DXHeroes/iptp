/* eslint-disable no-process-env */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeys } from './configKeys.enum';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(
    filePath: string = process.env.NODE_ENV === 'production'
      ? '.env'
      : '.env.development',
  ) {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.envConfig = {};
        return;
      }
      throw error;
    }
  }

  get(key: ConfigKeys, defaultValue?: string): string | undefined {
    return process.env[key] || this.envConfig[key] || defaultValue;
  }

  isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get(ConfigKeys.DB_HOST, 'localhost'),
      port: Number(this.get(ConfigKeys.DB_PORT, '5432')),
      username: this.get(ConfigKeys.DB_USER, 'postgres'),
      password: this.get(ConfigKeys.DB_PASSWORD, undefined),
      database: this.get(ConfigKeys.DB_NAME, 'iptp_dev'),
      entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
      autoLoadEntities: true,
      synchronize: true,
      ssl: this.isProduction() && {
        rejectUnauthorized: false,
      },
      migrationsTransactionMode: 'all',
    };
  }
}

const configService = new ConfigService();

export { configService };
