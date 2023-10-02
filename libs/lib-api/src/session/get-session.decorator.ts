import {SessionContents} from './session.types';
import {getRequestFromExecutionContext} from './session.utility';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

// tslint:disable-next-line:variable-name - In Typescript decorators start with a capital letter
export const GetSession = createParamDecorator(
  (_, ctx: ExecutionContext): SessionContents => {
    const request = getRequestFromExecutionContext(ctx);

    if (!request.session) {
      throw new Error('request.session is not defined');
    }

    return request.session;
  }
);
