import {resolve} from 'path';
import {GraphQLOptions} from './graphql.types';
import {GRAPHQL_PLAYGROUND} from './graphql.const';
import {DynamicModule, Module} from '@nestjs/common';
import {GraphQLModule as NestGraphQLModule} from '@nestjs/graphql';
import {ApolloDriverConfig, ApolloFederationDriver} from '@nestjs/apollo';

@Module({})
export class GraphQLModule {
  static forRoot(options?: GraphQLOptions): DynamicModule {
    return {
      module: GraphQLModule,
      imports: [
        NestGraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: {
            path: resolve(__dirname, './schema.gql'),
            federation: 2,
          },
          fieldResolverEnhancers: [
            'guards',
            ...(options?.fieldResolverEnhancers ?? []),
          ],
          playground: GRAPHQL_PLAYGROUND && {
            settings: {
              'request.credentials': 'include',
            },
          },
          introspection: GRAPHQL_PLAYGROUND,

          ...options,
        }),
      ],
      exports: [NestGraphQLModule],
    };
  }
}
