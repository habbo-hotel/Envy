import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {IntrospectAndCompose} from '@apollo/gateway';
import {AuthenticatedDataSource} from './authenticated-datasource';
import {GRAPHQL_PLAYGROUND} from 'libs/lib-api/src/graphql/graphql.const';
import {ApolloGatewayDriver, ApolloGatewayDriverConfig} from '@nestjs/apollo';
import {
  SVC_PROFILE_NAME,
  SVC_PROFILE_WEB_ADDRESS,
} from 'libs/lib-client/src/svc-profile/profile.const';
import {
  SVC_ROLE_NAME,
  SVC_ROLE_WEB_ADDRESS,
  SVC_SESSION_NAME,
  SVC_SESSION_WEB_ADDRESS,
  SVC_USER_NAME,
  SVC_USER_WEB_ADDRESS,
} from '@envy/lib-client';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        introspection: GRAPHQL_PLAYGROUND,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {name: SVC_SESSION_NAME, url: SVC_SESSION_WEB_ADDRESS},
            {name: SVC_USER_NAME, url: SVC_USER_WEB_ADDRESS},
            {name: SVC_ROLE_NAME, url: SVC_ROLE_WEB_ADDRESS},
            {name: SVC_PROFILE_NAME, url: SVC_PROFILE_WEB_ADDRESS},
          ],
        }),
        buildService({name, url}) {
          return new AuthenticatedDataSource({url});
        },
      },
    }),
  ],
})
export class GatewayModule {}
