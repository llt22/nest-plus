import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

interface IJwt {
  readonly secret: string;
  readonly expiresIn: number;
}

export class BaseConfig {
  port = 4000;

  jwt: IJwt = {
    secret: 'w234dsfetwer',
    expiresIn: 60 * 60 * 10,
  };

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
