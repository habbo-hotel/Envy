import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '..', '.env') });
import { GraphqlGatewayModule } from './graphql-gateway.module';
import { dynamicServiceBootstrap } from '@envy/lib-api';
import {
  SVC_GRAPHQL_GATEWAY_NAME,
  SVC_GRAPHQL_GATEWAY_PORT,
} from '@envy/lib-client';

dynamicServiceBootstrap(
  SVC_GRAPHQL_GATEWAY_NAME,
  GraphqlGatewayModule,
  SVC_GRAPHQL_GATEWAY_PORT,
  'gateway'
);
