import React, { Fragment } from 'react';
import { render, RenderResult } from '@testing-library/react';
import * as ApolloReactHooks from '@apollo/react-hooks';
import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import App from './App';
import { getSubmissionsQuery } from '../../dashboard/graphql';

describe('App', (): void => {
    it('should render correctly', (): void => {
        // Mock out instance of ApolloProvider so we can use a mocked provider instead
        jest.spyOn(ApolloReactHooks, 'ApolloProvider').mockImplementation(
            ({ children }: ApolloProviderProps<unknown>): JSX.Element => <Fragment>{children}</Fragment>,
        );
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
        expect(
            (): RenderResult =>
                render(<App />, {
                    wrapper: apolloWrapper(mockQueryResponse),
                }),
        ).not.toThrow();
    });
});
