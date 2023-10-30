import 'dotenv/config';
import {dynamicServiceBootstrap} from '@envy/lib-api';
import {
  SVC_FT_USER_INFORMATION_NAME,
  SVC_FT_USER_INFORMATION_PORT,
} from './ft-user-information.const';
import {FtUserInformationModule} from './ft-user-information.module';

dynamicServiceBootstrap(
  SVC_FT_USER_INFORMATION_NAME,
  FtUserInformationModule,
  SVC_FT_USER_INFORMATION_PORT,
  SVC_FT_USER_INFORMATION_NAME
);
