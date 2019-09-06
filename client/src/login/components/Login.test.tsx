import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';

import Login from './Login';

describe('Login', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Login />)).not.toThrow();
    });
});
