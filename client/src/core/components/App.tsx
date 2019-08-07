import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import NavBar from './NavBar';

import '@khanacademy/tota11y';
import '../styles/index.scss';

const App: React.FC = (): JSX.Element => (
    <div>
        <Router>
            <NavBar />
            <div className="site-content">
                <InitialSubmissionRoutes />
                <DashboardRoutes />
            </div>
        </Router>
    </div>
);

export default App;
