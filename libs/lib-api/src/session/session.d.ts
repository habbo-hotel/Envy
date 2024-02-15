import {Request as BaseRequest} from 'express';

declare module 'express' {
  export interface Request extends BaseRequest {
    session?: SessionContents;
  }
}
