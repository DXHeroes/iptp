const isProduction = () => process.env.NODE_ENV === 'production';

export enum UrlEnums {
  API_URL = getServerModeApiUrl(isProduction() ? 'production' : 'development'),
}

function getServerModeApiUrl(serverMode: string): any {
  switch (serverMode) {
    case 'development':
      return `http://localhost:${process.env.REACT_APP_PORT}/api`;
    case 'production':
      return `${process.env.REACT_APP_BE_BASE_URL}/api`;
  }
}
