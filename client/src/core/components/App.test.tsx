import * as React from 'react';
import App from './App';
import { render, RenderResult } from '@testing-library/react';

describe('App', (): void => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<App />)).not.toThrow();
    });
});
