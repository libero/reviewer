import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import SelectedPeopleList  from './SelectedPeopleList';

describe('SelectedPeopleList', (): void => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<SelectedPeopleList people={[]} openSelectorText=" "/>)).not.toThrow();
    });
});
