import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import '@khanacademy/tota11y';
import '../styles/index.scss';

declare var API_HOST: string;

const authToken = localStorage.getItem('token')

const App: React.FC = (): JSX.Element => (
    <div>
        <ApolloProvider client={createApolloClient(API_HOST, authToken)}>
            <Router>
                <NavBar />
                <div className="site-content">
                    <InitialSubmissionRoutes />
                    <DashboardRoutes />
                </div>
            </Router>
        </ApolloProvider>
    </div>
);

export default App;
