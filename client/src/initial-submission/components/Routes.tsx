import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SubmissionWizard from './SubmissionWizard';

const Routes: React.FC = (): JSX.Element => (
    <Switch>
        <Route component={(): JSX.Element => <div>Survey Page</div>} path="/survey/:id" />
        <Route component={(): JSX.Element => <div>Thankyou page</div>} path="/thankyou/:id" />
        <Route component={SubmissionWizard} path="/submit/:id" />
    </Switch>
);

export default Routes;
