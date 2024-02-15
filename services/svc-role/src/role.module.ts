import {Module} from '@nestjs/common';
import {RoleEntity} from './role.entity';
import {RoleResolver} from './role.resolver';
import {RoleRepository} from './role.repository';
import {RoleController} from './role.controller';
import {
  GraphQLModule,
  DatabaseModule,
  CommonModule,
  SessionModule,
} from '@envy/lib-api';

@Module({
  imports: [
    CommonModule,
    SessionModule,
    GraphQLModule.forRoot(),
    DatabaseModule.forRoot({
      entities: [RoleEntity],
      synchronize: true,
    }),
  ],
  providers: [RoleRepository, RoleResolver],
  controllers: [RoleController],
})
export class RoleModule {}
