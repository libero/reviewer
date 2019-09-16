import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import * as Auth from '../utils/auth';

const AuthRoute = ({ component: Component, ...rest }: RouteProps): JSX.Element => (
    <Route
        {...rest}
        render={(props): JSX.Element => (Auth.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
    ></Route>
);

export default AuthRoute;
