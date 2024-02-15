import {TypeOrmModule} from '@nestjs/typeorm';
import {DynamicModule, Module} from '@nestjs/common';
import {DatabaseModuleOptions} from './database.types';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_SSL,
  DATABASE_USERNAME,
} from '../common/environment.const';

@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          ssl: DATABASE_SSL,
          host: DATABASE_HOST,
          username: DATABASE_USERNAME,
          password: DATABASE_PASSWORD,
          database: DATABASE_NAME,
          entities: options.entities,
          ...(options as any),
        }),
        TypeOrmModule.forFeature(options.entities),
      ],
      exports: [TypeOrmModule],
    };
  }
}
