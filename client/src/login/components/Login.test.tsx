import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom'
import * as tokenUtils from '../utils/tokenUtils';
import Login from './Login';

describe('Login', (): void => {
    afterEach(cleanup)

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Login />)).not.toThrow();
    });

    it('should get set and decode token if present and redirect', (): void => {
        jest.spyOn(tokenUtils, 'getTokenFromUrl').mockImplementationOnce(() => 'token');
        jest.spyOn(tokenUtils, 'setToken').mockImplementationOnce(() => {});

        const { container } = render(<MemoryRouter initialEntries={['/login']}>
            <Route exact path="/login" render={() => <Login></Login>} />
            <Route path="/" render={() => 'Root'} />
        </MemoryRouter>)

        expect(tokenUtils.getTokenFromUrl).toHaveBeenCalledTimes(1)
        expect(tokenUtils.setToken).toHaveBeenCalledTimes(1)
        expect(tokenUtils.setToken).toHaveBeenCalledWith('token')
        expect(container.textContent).toBe('Root')
    });

    it('should render login page if no token set in url', (): void  => {
        const { container } = render(<MemoryRouter initialEntries={['/login']}>
            <Route exact path="/login" render={() => <Login></Login>} />
            <Route path="/" render={() => 'Root'} />
        </MemoryRouter>)

        jest.spyOn(tokenUtils, 'getTokenFromUrl').mockImplementationOnce(() => '');

        expect(container.querySelector('.login-page')).not.toBe(null)
    });
});
