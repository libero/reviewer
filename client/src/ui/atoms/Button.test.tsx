import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Button />)).not.toThrow();
    });

    it('should append the type string passed to a button-- class', (): void => {
        const { getByText } = render(<Button type="primary">test</Button>);
        expect(getByText('test')).toHaveClass('button--primary');
    });

    it('should call function when clicked', (): void => {
        const mockFn = jest.fn();
        const { container } = render(<Button onClick={mockFn} />);
        fireEvent.click(container.querySelector('button'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should append passed className to button styling classes', (): void => {
        const { getByText } = render(<Button className="some-class">test</Button>);
        expect(getByText('test')).toHaveClass('some-class');
        expect(getByText('test')).toHaveClass('button');
    });

    it('should be disabled if the disabled prop is true', (): void => {
        const { getByText } = render(<Button disabled={true}>test</Button>);
        expect(getByText('test')).toBeDisabled();
    });
});
