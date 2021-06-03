import * as dotenv from 'dotenv';

dotenv.config();
console.log('current environment is ', process.env.NODE_ENV);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/global.exception.filter';
import { CamelUnderscoreInterceptor } from './common/camel.underscore.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 根据 dto 的约束，进行数据验证和转换
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new CamelUnderscoreInterceptor());
  await app.listen(4000);
  console.log(`server is running on http://localhost:4000`);
}

bootstrap();
