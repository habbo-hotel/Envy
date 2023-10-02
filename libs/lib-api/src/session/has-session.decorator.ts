import {UseGuards} from '@nestjs/common';
import {SessionIsValidGuard} from './session-is-valid.guard';

export function HasSession() {
  return UseGuards(SessionIsValidGuard);
}
