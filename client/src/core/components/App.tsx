import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../../dashboard/components/Dashboard';
import Submission from '../../submission/Submission';
import NavBar from './NavBar';

import '@khanacademy/tota11y';
import '../styles/index.scss';

const App: React.FC = (): JSX.Element => (
    <div>
        <Router>
            <NavBar />
            <div className="site-content">
                <Route exact path="/" component={Dashboard} />
                <Route path="/submission/:id/:stage" component={Submission} />
            </div>
        </Router>
    </div>
);

export default App;
