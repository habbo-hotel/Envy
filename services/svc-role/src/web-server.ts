import 'dotenv/config';
import {RoleModule} from './role.module';
import {dynamicServiceBootstrap} from '@envy/lib-api';
import {SVC_ROLE_NAME, SVC_ROLE_WEB_SERVER_PORT} from '@envy/lib-client';

dynamicServiceBootstrap(
  SVC_ROLE_NAME,
  RoleModule,
  SVC_ROLE_WEB_SERVER_PORT,
  'role'
);
