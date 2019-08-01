import React from 'react';
import Routes from './Routes';
import routerWrapper from '../../../test-utils/routerWrapper';
import { render, RenderResult } from '@testing-library/react';

const renderRoutesWithPath = (route: string = ''): RenderResult =>
    render(<Routes />, {
        wrapper: routerWrapper([route]),
    });

describe('DashboardRoutes', (): void => {
    it('should render correctly', (): void => {
        expect(renderRoutesWithPath).not.toThrow();
    });
    it('should render / route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/')).not.toThrow();
    });
});
