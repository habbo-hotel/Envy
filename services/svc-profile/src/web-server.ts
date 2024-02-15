import { ProfileModule } from './profile.module';
import { dynamicServiceBootstrap } from '@envy/lib-api';
import {
  SVC_PROFILE_NAME,
  SVC_PROFILE_WEB_PORT,
} from 'libs/lib-client/src/svc-profile/profile.const';

dynamicServiceBootstrap(
  SVC_PROFILE_NAME,
  ProfileModule,
  SVC_PROFILE_WEB_PORT,
  'profile'
);
