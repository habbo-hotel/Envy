import { dynamicServiceBootstrap } from '@envy/lib-api';
import {
  SVC_FT_USER_HANDSHAKE_NAME,
  SVC_FT_USER_HANDSHAKE_PORT,
} from './ft-user.const';
import { User } from './ft-user.module';

dynamicServiceBootstrap(
  SVC_FT_USER_HANDSHAKE_NAME,
  User,
  SVC_FT_USER_HANDSHAKE_PORT,
  SVC_FT_USER_HANDSHAKE_NAME
);
