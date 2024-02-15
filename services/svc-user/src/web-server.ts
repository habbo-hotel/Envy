import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '..', '.env') });
import { UserModule } from './user.module';
import { dynamicServiceBootstrap } from '@envy/lib-api';
import { SVC_USER_NAME, SVC_USER_WEB_PORT } from '@envy/lib-client';

dynamicServiceBootstrap(SVC_USER_NAME, UserModule, SVC_USER_WEB_PORT, 'user');
