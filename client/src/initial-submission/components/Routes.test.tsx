import React from 'react';
import Routes from './Routes';
import routerWrapper from '../../../test-utils/routerWrapper';
import { cleanup, render, RenderResult } from '@testing-library/react';

const renderRoutesWithPath = (route: string = ''): RenderResult =>
    render(<Routes />, {
        wrapper: routerWrapper([route]),
    });

describe('InitialSubmissionRoutes', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect(renderRoutesWithPath).not.toThrow();
    });
    it('should render submit/id route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/submit/id')).not.toThrow();
    });
    it('should render thankyou/id route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/thankyou/id')).not.toThrow();
    });
    it('should render survey/id route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/survey/id')).not.toThrow();
    });
});
