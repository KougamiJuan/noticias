import { config } from '../../config';

export const environment = {
  production: true,
  apiKey: config.API_KEY,
  apiUrl: 'https://api.nytimes.com/svc/search/v2'
};
