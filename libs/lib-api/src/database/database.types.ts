import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export type DatabaseModuleOptions = DatabaseModuleCustomOptions &
  TypeOrmModuleOptions;

export interface DatabaseModuleCustomOptions {
  entities: Function[];
}
