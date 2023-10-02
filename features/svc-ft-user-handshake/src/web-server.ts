import 'dotenv/config';
import { FtUserHandshakeModule } from './ft-user-handshake.module';
import { dynamicServiceBootstrap } from '@envy/lib-api';
import { SVC_FT_USER_HANDSHAKE_NAME, SVC_FT_USER_HANDSHAKE_PORT } from './ft-user-handshake.const';

dynamicServiceBootstrap(
  SVC_FT_USER_HANDSHAKE_NAME,
  FtUserHandshakeModule,
  SVC_FT_USER_HANDSHAKE_PORT,
  SVC_FT_USER_HANDSHAKE_NAME
);
