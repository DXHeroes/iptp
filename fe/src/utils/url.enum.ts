const isProduction = () => process.env.NODE_ENV === 'production';

export enum UrlEnums {
  API_URL = getServerModeApiUrl(isProduction() ? 'production' : 'development'),
}

function getServerModeApiUrl(serverMode: string): any {
  switch (serverMode) {
    case 'development':
      return `http://localhost:${process.env.PORT}/api`;
    case 'production':
      return `${process.env.BE_BASE_URL}/api`;
  }
}
