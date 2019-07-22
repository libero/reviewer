import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Submission from './submission/Submission';
import NavBar from './core/NavBar';

import '../styles/index.scss'

const App: React.StatelessComponent = (): JSX.Element => (
    <div>
        <Router>
            <NavBar />
            <Route exact path="/" component={(): JSX.Element => <div>home route</div>} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/submission/:id/:stage" component={Submission} />
        </Router>
    </div>
);

export default App;
