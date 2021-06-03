import { BaseConfig } from './base';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class DevelopmentConfig extends BaseConfig {
  database: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
    timezone: '+8.00',
    namingStrategy: new SnakeNamingStrategy(),
  };
}
