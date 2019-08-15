import ApolloClient from 'apollo-boost';

const getHeaders = (authenticationToken?: string) =>({
      headers: {
        authorization: authenticationToken ? `Bearer ${authenticationToken}` : "",
      }
    });

export default (host: string, authenticationToken?: string) =>
    new ApolloClient({
        uri: `${host}/graphql`,
        request: async (operation) => {
            await operation.setContext(getHeaders(authenticationToken));
        }
    });
