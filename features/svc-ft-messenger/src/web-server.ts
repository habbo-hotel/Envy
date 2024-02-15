import 'dotenv/config';
import {dynamicServiceBootstrap} from '@envy/lib-api';
import {
  SVC_FT_MESSENGER_INFORMATION_NAME,
  SVC_FT_MESSENGER_INFORMATION_PORT,
} from './ft-messenger.const';
import {FtMessengerInformationModule} from './ft-messenger.module';

dynamicServiceBootstrap(
  SVC_FT_MESSENGER_INFORMATION_NAME,
  FtMessengerInformationModule,
  SVC_FT_MESSENGER_INFORMATION_PORT,
  SVC_FT_MESSENGER_INFORMATION_NAME
);
