import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import  ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import NavBar from './NavBar';

import '@khanacademy/tota11y';
import '../styles/index.scss';

declare var API_HOST: string;

const client = new ApolloClient({
    uri: `${API_HOST}/graphql`,
});

const App: React.FC = (): JSX.Element => (
    <div>
        <ApolloProvider client={client}>
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
