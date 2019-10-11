import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import SelectedOption from './SelectedOption';

describe('SelectedOption', (): void => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<SelectedOption text="Ian Malcolm" />)).not.toThrow();
    });

    it('should render the option text', (): void => {
        const { container } = render(<SelectedOption text="Ian Malcolm" />);

        expect(container.querySelector('.selected-option__text').textContent).toBe('Ian Malcolm');
    });
});
