import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import UploadIcon from './UploadIcon';

describe('UploadIcon', (): void => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<UploadIcon />)).not.toThrow();
    })
});
