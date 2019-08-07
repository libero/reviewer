import React, { useRef } from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useOnClickOutside from './useOnClickOutside';

describe('useOnclickOutside', (): void => {
    afterEach(cleanup);
    const mockFn = jest.fn();
    afterEach(mockFn.mockReset);
    const MockFuncComp = (): JSX.Element => {
        const eleRef = useRef<HTMLDivElement>();
        useOnClickOutside(eleRef, mockFn);
        return <div ref={eleRef}>element</div>;
    };

    it('should not call the function on click inside the element', (): void => {
        const { getByText } = render(
            <div>
                <MockFuncComp />
                <span>test</span>
            </div>,
        );
        fireEvent.click(getByText('element'));
        expect(mockFn).not.toHaveBeenCalled();
    });

    it('should call the function on click outside the element', (): void => {
        const { getByText } = render(
            <div>
                <MockFuncComp />
                <span>test</span>
            </div>,
        );
        fireEvent.click(getByText('test'));
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
