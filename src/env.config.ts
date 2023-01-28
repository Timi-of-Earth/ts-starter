import dotenv from 'dotenv';
import { cleanEnv, port, str, num, url } from 'envalid';

dotenv.config({ path: '.env' });

const env = cleanEnv(process.env, {
  DATABASE_PASSWORD: str(),
  DATABASE_URI: url(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: port(),
  JWT_COOKIE_EXPIRES_IN: num(),
  JWT_EXPIRES_IN: num(),
  JWT_SECRET_KEY: str(),
});

export default env;
