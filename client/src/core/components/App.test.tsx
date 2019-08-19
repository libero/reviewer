import React, { Fragment } from 'react';
import { render, RenderResult } from '@testing-library/react';
import * as ApolloReactHooks from '@apollo/react-hooks';
import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';
import { gql } from 'apollo-boost';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import App from './App';


//need to declare the global vars, would be good to have this in setup script but that means making it a ts not js file.
declare global {
    namespace NodeJS {
      interface Global {
         API_HOST: string;
         fetch: Function
    }
  }
}

//mock fetch used by Apollo
global.fetch = jest.fn();
// mock webpack injected global
global.API_HOST = '';

describe('App', (): void => {
    it('should render correctly', (): void => {
        // Mock out instance of ApolloProvider so we can use a mocked provider instead
        jest.spyOn(ApolloReactHooks, 'ApolloProvider').mockImplementation(
          ({ children }: ApolloProviderProps<unknown>) => <Fragment>{ children }</Fragment>
        );
        // TODO: query here should be same as imported into Dashboard.tsx
        const mockQueryResponse = [
          {
            request: {
              query: gql`
                query GetSubmissions {
                    getSubmissions {
                        id
                        title
                        updated
                    }
                }
            `
            },
            result: {
              data: {
                getSubmissions: {},
              },
            },
          },
        ];
        
        expect((): RenderResult => render(<App />, {
          wrapper: apolloWrapper(mockQueryResponse),
        })).not.toThrow();
    });
});
