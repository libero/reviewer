import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Submission } from '../../initial-submission/types';
import { Button, Paragraph } from '../../ui/atoms';
import SubmissionList from './SubmissionList';

const Dashboard = withRouter(
    ({ history }): JSX.Element => {
        const [submissions, setSubmissions]: [Submission[], Function] = useState([]);
        const [fetched, setFetched] = useState(false);

        return (
            <div className="dashboard">
                <div className="dashboard__button_container">
                    <Button
                        type="primary"
                        onClick={(): void => {
                        }}
                    >
                        New Submission
                    </Button>
                </div>
                <SubmissionList submissions={submissions} />
                <Paragraph type="footer">
                    To find existing submissions or to submit a{' '}
                    <Link className="footer__link" to="/author-guide/types">
                        Research Advance
                    </Link>{' '}
                    please visit our{' '}
                    <a className="footer__link" href="https://submit.elifesciences.org">
                        full peer review and submissions system
                    </a>{' '}
                </Paragraph>
            </div>
        );
    },
);

export default Dashboard;
