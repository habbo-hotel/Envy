import {ExecutionContext} from '@nestjs/common';
import {RequestWithSession} from './session.types';
import {GqlExecutionContext} from '@nestjs/graphql';

export function getRequestFromExecutionContext(
  executionContext: ExecutionContext
): RequestWithSession {
  return executionContext.getType() === 'http'
    ? executionContext.switchToHttp().getRequest()
    : GqlExecutionContext.create(executionContext).getContext().req;
}
