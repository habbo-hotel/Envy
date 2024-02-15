import {Module} from '@nestjs/common';
import {RoleClientModule} from '@envy/lib-client';
import {SessionModule} from '../session/session.module';
import {RoleHasRequiredScopeGuard} from './role-has-required-scope.guard';

@Module({
  imports: [SessionModule, RoleClientModule],
  providers: [RoleHasRequiredScopeGuard],
  exports: [RoleHasRequiredScopeGuard, RoleClientModule],
})
export class RoleModule {}
