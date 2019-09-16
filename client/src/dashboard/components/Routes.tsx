import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import AuthRoute from '../../core/components/AuthRoute';

const Routes: React.FC = (): JSX.Element => (
    <Switch>
        <AuthRoute exact path="/" component={Dashboard} />
    </Switch>
);

export default Routes;
