import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '..', '.env') });
import { dynamicServiceBootstrap } from '@envy/lib-api';
import { SessionServiceModule } from './session.module';
import { SVC_SESSION_NAME, SVC_SESSION_WEB_PORT } from '@envy/lib-client';

dynamicServiceBootstrap(
  SVC_SESSION_NAME,
  SessionServiceModule,
  SVC_SESSION_WEB_PORT,
  'session'
);
