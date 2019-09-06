import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ImageWithAttribution from './ImageWithAttribution';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<ImageWithAttribution image={''} artistName={''} artistUrl={''} />),
        ).not.toThrow();
    });

    it('should append the type string passed to a button-- class', (): void => {
        const { getByText } = render(<ImageWithAttribution image={''} artistName={''} artistUrl={''} />);
        expect(getByText('image-attribution')).toBeInTheDocument();
    });
});
