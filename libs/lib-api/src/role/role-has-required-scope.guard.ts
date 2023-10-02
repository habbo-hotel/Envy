import {Reflector} from '@nestjs/core';
import {RoleScopesWire} from '@envy/lib-client';
import {RequestWithSession} from '../session/session.types';
import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {getRequestFromExecutionContext} from '../session/session.utility';

@Injectable()
export class RoleHasRequiredScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredScope: keyof RoleScopesWire = this.reflector.get(
      'scope',
      context.getHandler()
    );
    const request: RequestWithSession = getRequestFromExecutionContext(
      context
    ) as RequestWithSession;

    return !!request.session.scopes[requiredScope];
  }
}
