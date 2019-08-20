import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Routes from './Routes';
import combineWrappers from '../../../test-utils/combineWrappers';
import routerWrapper from '../../../test-utils/routerWrapper';
import apolloWrapper from '../../../test-utils/apolloWrapper';

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

const renderRoutesWithPath = (route: string = ''): RenderResult =>
    render(<Routes />, {
        wrapper: combineWrappers(apolloWrapper(mockQueryResponse), routerWrapper([route])),
    });

describe('DashboardRoutes', (): void => {
    it('should render correctly', (): void => {
        expect(renderRoutesWithPath).not.toThrow();
    });
    it('should render / route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/')).not.toThrow();
    });
});
