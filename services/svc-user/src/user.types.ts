import {RequestWithSession} from '@envy/lib-api';

export interface SvcUserRequest extends Omit<RequestWithSession, 'params'> {
  params: {
    userID: number;
  };
}
