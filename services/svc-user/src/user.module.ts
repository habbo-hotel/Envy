import {Module} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {UserService} from './user-service';
import {UserResolver} from './user.resolver';
import {UserController} from './user.controller';
import {UserRepository} from './user.repository';
import {RoleClientModule, UserClientModule} from '@envy/lib-client';
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
    RoleClientModule,
    UserClientModule,
    GraphQLModule.forRoot(),
    DatabaseModule.forRoot({
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  providers: [UserRepository, UserResolver, UserService],
  controllers: [UserController],
})
export class UserModule {}
