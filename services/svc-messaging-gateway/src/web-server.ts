import 'dotenv/config';
import {dynamicServiceBootstrap} from '@envy/lib-api';
import {SVC_GATEWAY_NAME, SVC_GATEWAY_WEB_SERVER_PORT} from '@envy/lib-client';
import {MessagingGatewayModule} from './messaging-gateway.module';

dynamicServiceBootstrap(
  SVC_GATEWAY_NAME,
  MessagingGatewayModule,
  SVC_GATEWAY_WEB_SERVER_PORT,
  'gateway'
);
