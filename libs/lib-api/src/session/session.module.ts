import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {SessionIsValidGuard} from './session-is-valid.guard';
import {SessionClientModule} from '@envy/lib-client';
import {JWT_EXPIRES, JWT_SECRET} from './session.const';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
    SessionClientModule,
  ],
  providers: [SessionIsValidGuard],
  exports: [SessionIsValidGuard, JwtModule, SessionClientModule],
})
export class SessionModule {}
