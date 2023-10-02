import React from 'react';
import './EnvyPlayground.css';
import 'graphiql/graphiql.css';
import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

const fetcher = createGraphiQLFetcher({ url: 'http://localhost:3000/graphql' });


export function EnvyPlayground() {
  return <GraphiQL fetcher={fetcher} />;
}
