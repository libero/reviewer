import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const Routes: React.FC = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
  </Switch>
)

export default Routes;
