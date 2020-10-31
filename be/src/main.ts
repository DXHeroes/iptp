import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { ConfigKeys } from './config/configKeys.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get(ConfigKeys.PORT, '3000'));
}
bootstrap();
