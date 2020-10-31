import { InternalServerErrorException } from '@nestjs/common';
import { configService } from '../config/config.service';
import { ConfigKeys } from '../config/configKeys.enum';

export const getServerBaseUri = (isFrontend = false): string => {
  switch (configService.get(ConfigKeys.NODE_ENV)) {
    case 'development':
      return isFrontend
        ? `${configService.get(
            ConfigKeys.FE_BASE_URL,
            `http://localhost:${configService.get(ConfigKeys.FE_PORT, '3001')}`,
          )}`
        : `${configService.get(
            ConfigKeys.BE_BASE_URL,
            `http://localhost:${configService.get(ConfigKeys.PORT, '3000')}`,
          )}`;
    case 'production':
      return isFrontend
        ? `${configService.get(
            ConfigKeys.FE_BASE_URL,
            'https://ifpaythenpay.io',
          )}`
        : `${configService.get(
            ConfigKeys.BE_BASE_URL,
            'https://ifpaythenpay.io',
          )}`;
    default:
      throw new InternalServerErrorException(
        `Server mode ${configService.get(
          ConfigKeys.NODE_ENV,
        )} is not supported`,
      );
  }
};
