import {Request} from 'express';
import {RoleScopesWire} from '@envy/lib-client';

export interface SessionContents {
  userID: number;
  profileID: number;
  sessionID: number;
  expiresAt: number;
  scopes: RoleScopesWire;
}

export interface RequestWithSession extends Request {
  rawBody: any;
  session: SessionContents;
}
