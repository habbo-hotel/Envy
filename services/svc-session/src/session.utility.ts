import {ExecutionContext} from '@nestjs/common';
import {RequestWithSession} from './session.types';
import {GqlExecutionContext} from '@nestjs/graphql';

export function getRequestFromExecutionContext(
  executionContext: ExecutionContext
): RequestWithSession {
  return GqlExecutionContext.create(executionContext).getContext().req;
}
