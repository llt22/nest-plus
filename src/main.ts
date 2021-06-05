import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// 导入 config 必须先执行，确保 dotenv 提前加载环境变量
import { config } from './config';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/global.exception.filter';
import { CamelUnderscoreInterceptor } from './common/camel.underscore.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 根据 dto 的约束，进行数据验证和转换
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new CamelUnderscoreInterceptor());
  await app.listen(config.port);
}

bootstrap().then(() => {
  console.log('current environment is ', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    console.log(`server is running on http://localhost:${config.port}`);
  } else {
    console.log(`server is running on port ${config.port}`);
  }
});
