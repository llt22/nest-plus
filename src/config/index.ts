import * as dotenv from 'dotenv';

import { DevelopmentConfig } from './development';
import { ProductionConfig } from './production';

dotenv.config();

const configs = {
  development: new DevelopmentConfig(),
  production: new ProductionConfig(),
};

export const config = configs[process.env.NODE_ENV];
