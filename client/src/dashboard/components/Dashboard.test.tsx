import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import Dashboard from './Dashboard';
import routerWrapper from '../../../test-utils/routerWrapper';

describe('Dashboard', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<Dashboard />, {
                    wrapper: routerWrapper(['/link-1']),
                }),
        ).not.toThrow();
    });
});
