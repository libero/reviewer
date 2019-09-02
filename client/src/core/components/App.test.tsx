import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import * as ApolloReactHooks from '@apollo/react-hooks';
import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import App from './App';
import { getSubmissionsQuery } from '../../dashboard/graphql';

describe('App', (): void => {
    it('should render correctly', (): void => {
        const mockQueryResponse = [
            {
                request: {
                    query: getSubmissionsQuery,
                },
                result: {
                    data: {
                        getSubmissions: {},
                    },
                },
            },
        ];
        // Mock out instance of ApolloProvider so we can use a mocked provider instead
        jest.spyOn(ApolloReactHooks, 'ApolloProvider').mockImplementation(
            ({ children }: ApolloProviderProps<unknown>): JSX.Element => apolloWrapper(mockQueryResponse)({ children }),
        );
        expect((): RenderResult => render(<App />)).not.toThrow();
    });
});
