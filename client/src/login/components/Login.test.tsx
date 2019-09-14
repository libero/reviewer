import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import * as Auth from '../../core/utils/auth';
import Login from './Login';

describe('Login', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Login />)).not.toThrow();
    });

    it('should import the token', (): void => {
        jest.spyOn(Auth, 'importToken').mockImplementationOnce(jest.fn());

        render(<Login />);
        expect(Auth.importToken).toHaveBeenCalledTimes(1);
    });

    it('should redirect if authenticated', (): void => {
        jest.spyOn(Auth, 'importToken').mockImplementationOnce(jest.fn());
        jest.spyOn(Auth, 'isAuthenticated').mockImplementationOnce((): boolean => true);

        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Route exact path="/login" render={(): JSX.Element => <Login></Login>} />
                <Route path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.querySelector('.login-page')).toBe(null);
        expect(container.textContent).toBe('Root');
    });

    it('should render login page if not authenticated', (): void => {
        jest.spyOn(Auth, 'importToken').mockImplementationOnce(jest.fn());
        jest.spyOn(Auth, 'isAuthenticated').mockImplementationOnce((): boolean => false);

        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Route exact path="/login" render={(): JSX.Element => <Login></Login>} />
                <Route path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.querySelector('.login-page')).not.toBe(null);
    });
});
