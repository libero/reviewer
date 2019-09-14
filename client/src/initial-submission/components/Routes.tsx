import React from 'react';
import { Switch } from 'react-router-dom';
import SubmissionWizard from './SubmissionWizard';
import AuthRoute from '../../core/components/AuthRoute';

const Routes: React.FC = (): JSX.Element => (
    <Switch>
        <AuthRoute path="/survey/:id" component={(): JSX.Element => <div>Survey Page</div>} />
        <AuthRoute path="/thankyou/:id" component={(): JSX.Element => <div>Thankyou page</div>} />
        <AuthRoute path="/submit/:id" component={SubmissionWizard} />
    </Switch>
);

export default Routes;
