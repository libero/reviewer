import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';

import combineWrappers from '../../../test-utils/combineWrappers';
import routerWrapper from '../../../test-utils/routerWrapper';
import apolloWrapper from '../../../test-utils/apolloWrapper';

import Dashboard from './Dashboard';
import { getSubmissionsQuery } from '../../dashboard/graphql';

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

describe('Dashboard', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<Dashboard />, {
                    wrapper: combineWrappers(apolloWrapper(mockQueryResponse), routerWrapper(['/link-1'])),
                }),
        ).not.toThrow();
    });
});
