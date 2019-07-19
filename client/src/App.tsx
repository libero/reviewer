import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const App: React.StatelessComponent = (): JSX.Element => (
    <Router>
        <Route exact path="/" component={(): JSX.Element => <div>home route</div>} />
        <Route exact path="/dashboard" component={Dashboard} />
    </Router>
);

export default App;
