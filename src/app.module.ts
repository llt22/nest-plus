import { MiddlewareConsumer, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { loggerMiddleware } from './common/logger.middleware';
import { UserModule } from './module/user/user.module';
import { config } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(config.database), UserModule],
  controllers: [AppController],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
