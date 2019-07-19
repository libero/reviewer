import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Submission from './submission/Submission';

const App: React.StatelessComponent = (): JSX.Element => (
    <Router>
        <Route exact path="/" component={(): JSX.Element => <div>home route</div>} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/submission/:id/:stage" component={Submission}/>
    </Router>
);

export default App;
