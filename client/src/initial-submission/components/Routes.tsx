import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SubmissionWizard from './SubmissionWizard';

const Routes: React.FC = (): JSX.Element => (
    <Switch>
        <Route path="/survey/:id" component={(): JSX.Element => <div>Survey Page</div>} />
        <Route path="/thankyou/:id" component={(): JSX.Element => <div>Thankyou page</div>} />
        <Route path="/submit/:id" component={SubmissionWizard} />
    </Switch>
);

export default Routes;
