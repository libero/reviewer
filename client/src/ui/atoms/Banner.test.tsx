import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import Banner from './Banner';

describe('Banner', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Banner />)).not.toThrow();
    });
    it('renders children as content', (): void => {
        const { getByText } = render(<Banner>SomeTestText</Banner>);
        expect(getByText('SomeTestText')).toBeInTheDocument();
    });
});
