import ApolloClient from 'apollo-boost';

interface Headers {
    authorization: string;
}
const getHeaders = (authenticationToken?: string): Record<string, Headers> => ({
    headers: {
        authorization: authenticationToken ? `Bearer ${authenticationToken}` : '',
    },
});

export default (host: string, authenticationToken?: string): ApolloClient<unknown> =>
    new ApolloClient({
        uri: `${host}/graphql`,
        request: async (operation): Promise<void> => {
            await operation.setContext(getHeaders(authenticationToken));
        },
    });
