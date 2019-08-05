import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Button />)).not.toThrow();
    });

    it('should render the correct colour buttons', (): void => {
        const { getByText } = render(<Button type="primary">test</Button>);
        expect(getByText('test')).toHaveClass('button--primary');
    });

    it('should call function when clicked', (): void => {
        const mockFn = jest.fn();
        const { container } = render(<Button onClick={mockFn} />);
        fireEvent.click(container.querySelector('button'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
