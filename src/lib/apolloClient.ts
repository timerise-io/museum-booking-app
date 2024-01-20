import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://sandbox-api.timerise.io/v1',
  cache: new InMemoryCache(),
});

export default apolloClient;
