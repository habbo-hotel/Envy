import {UseGuards} from '@nestjs/common';
import {SessionIsValidGuard} from '../session/session-is-valid.guard';
import {RoleHasRequiredScopeGuard} from './role-has-required-scope.guard';

export function RoleHasRequiredScope() {
  return UseGuards(SessionIsValidGuard, RoleHasRequiredScopeGuard);
}
