import {
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({request, context}: GraphQLDataSourceProcessOptions<any>) {
    request.http!.headers.set(
      'authorization',
      context?.req?.headers?.authorization
    );
  }
}
