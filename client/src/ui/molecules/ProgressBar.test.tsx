import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('Button', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<ProgressBar />)).not.toThrow();
    });
});
