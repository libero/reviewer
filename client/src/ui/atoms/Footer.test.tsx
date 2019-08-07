import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Footer />)).not.toThrow();
    });

    it('should render with the correct classes', (): void => {
        const { getByText } = render(<Footer>test</Footer>);
        expect(getByText('test')).toHaveClass('paragraph', 'paragraph--small', 'paragraph--secondary', 'footer');
    });

    it('should render the children', (): void => {
        const { getByText } = render(
            <Footer>
                <span>test</span>
                <span>test2</span>
            </Footer>,
        );
        expect(getByText('test')).toBeInTheDocument();
        expect(getByText('test2')).toBeInTheDocument();
    });
});
