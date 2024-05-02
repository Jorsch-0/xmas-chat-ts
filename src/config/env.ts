import 'dotenv/config';
import { get } from 'env-var';

export const env = {
  PORT: get('PORT').default('8000').asPortNumber(),
  NODE_ENV: get('NODE_ENV').default('development').asEnum(['development', 'production', 'test']),
  DATABASE_URL: get('DATABASE_URL').required().asUrlString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
};
