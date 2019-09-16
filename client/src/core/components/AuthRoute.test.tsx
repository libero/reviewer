import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router';
import { render } from '@testing-library/react';
import AuthRoute from './AuthRoute';
import * as Auth from '../utils/auth';

describe('AuthRoute', (): void => {
    it('should redirect to login if not authenticated', (): void => {
        jest.spyOn(Auth, 'isAuthenticated').mockImplementation((): boolean => false);

        const { container } = render(
            <MemoryRouter initialEntries={['/']}>
                <Switch>
                    <AuthRoute exact path="/" component={(): JSX.Element => <div>Authenticated</div>}></AuthRoute>
                    <Route exact path="/login" component={(): JSX.Element => <div>Login</div>}></Route>
                </Switch>
            </MemoryRouter>,
        );

        expect(container.textContent).toBe('Login');
    });

    it('should render if authenticated', (): void => {
        jest.spyOn(Auth, 'isAuthenticated').mockImplementation((): boolean => true);

        const { container } = render(
            <MemoryRouter initialEntries={['/']}>
                <Switch>
                    <AuthRoute exact path="/" component={(): JSX.Element => <div>Authenticated</div>}></AuthRoute>
                    <Route exact path="/login" component={(): JSX.Element => <div>Login</div>}></Route>
                </Switch>
            </MemoryRouter>,
        );

        expect(container.textContent).toBe('Authenticated');
    });
});
