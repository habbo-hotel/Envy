import {Module} from '@nestjs/common';
import {SessionEntity} from './session.entity';
import {SessionService} from './session.service';
import {SessionResolver} from './session.resolver';
import {SessionController} from './session.controller';
import {SessionRepository} from './session.repository';
import {
  ProfileClientModule,
  RoleClientModule,
  UserClientModule,
} from '@envy/lib-client';
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
    UserClientModule,
    RoleClientModule,
    ProfileClientModule,
    GraphQLModule.forRoot(),
    DatabaseModule.forRoot({
      entities: [SessionEntity],
      synchronize: true,
    }),
  ],
  providers: [SessionRepository, SessionResolver, SessionService],
  controllers: [SessionController],
})
export class SessionServiceModule {}
