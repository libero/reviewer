import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useModal from './useModal';

describe('useModal', (): void => {
    afterEach(cleanup);
    const MockFuncComp = (): JSX.Element => {
        const { isShowing, toggle } = useModal();
        return <button onClick={(): void => toggle()}>{isShowing ? 'visible' : 'hidden'}</button>;
    };

    it('should return isShowing as false by default', (): void => {
        const { getByText } = render(<MockFuncComp />);
        expect(getByText('hidden')).toBeInTheDocument();
    });

    it('should toggle isVisible on toggle function call', (): void => {
        const { getByText } = render(<MockFuncComp />);
        expect(getByText('hidden')).toBeInTheDocument();
        fireEvent.click(getByText('hidden'));
        expect(getByText('visible')).toBeInTheDocument();
    });
});
