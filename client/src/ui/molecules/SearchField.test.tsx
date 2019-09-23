import React from 'react';
import { cleanup, render, RenderResult, fireEvent, waitForElement } from '@testing-library/react';
import SearchField from './SearchField';

describe('TextField', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<SearchField id="test" />)).not.toThrow();
    });

    it('should render the label text', (): void => {
        const { getByText } = render(<SearchField id="test" />);
        expect(getByText('search-box--label')).toBeInTheDocument();
    });

    it('should render the helper text when it is passed in', (): void => {
        const { getByText } = render(<SearchField id="test" />);
        expect(getByText('search-box--helper')).toBeInTheDocument();
    });

    it('should trigger onchange when callback is passed in', async (): Promise<void> => {
        const onChangeFn = jest.fn();
        const { container } = render(<SearchField id="test" onChange={onChangeFn} />);
        await fireEvent.change(container.querySelector('input'), { target: { value: 'blah' } });
        expect(onChangeFn).toHaveBeenCalled();
    });
});
