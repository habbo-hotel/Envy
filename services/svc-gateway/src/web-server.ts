import 'dotenv/config';
import {GatewayModule} from './gateway.module';
import {dynamicServiceBootstrap} from '@envy/lib-api';
import {SVC_GATEWAY_NAME, SVC_GATEWAY_WEB_SERVER_PORT} from '@envy/lib-client';

dynamicServiceBootstrap(
  SVC_GATEWAY_NAME,
  GatewayModule,
  SVC_GATEWAY_WEB_SERVER_PORT,
  'gateway'
);
