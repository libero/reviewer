import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getSubmissions, startSubmission } from '../../initial-submission/components/submission.entities';
import { Submission } from '../../initial-submission/types';
import { Button, Footer } from '../../ui/atoms';
import SubmissionList from './SubmissionList';

const Dashboard = withRouter(
    ({ history }): JSX.Element => {
        const [submissions, setSubmissions]: [Submission[], Function] = useState([]);
        const [fetched, setFetched] = useState(false);

        // only fetch once to prevent render loop
        if (!fetched) {
            getSubmissions()
                .then((fetchedSubmissions: Submission[]): void => {
                    setSubmissions(fetchedSubmissions);
                    setFetched(true);
                })
                .catch((): void => {
                    setFetched(true);
                });
        }

        return (
            <div className="dashboard">
                <div className="dashboard__button_container">
                    <Button
                        type="primary"
                        onClick={(): void => {
                            startSubmission().then((submission): void => {
                                history.push(`/submission/${submission.id}/title`);
                            });
                        }}
                    >
                        New Submission
                    </Button>
                </div>
                <SubmissionList submissions={submissions} />
                <Footer>
                    <p>
                        To find existing submissions or to submit a{' '}
                        <Link className="footer__link" to="/author-guide/types">
                            Research Advance
                        </Link>{' '}
                        please visit our{' '}
                        <a className="footer__link" href="https://submit.elifesciences.org">
                            full peer review and submissions system
                        </a>{' '}
                    </p>
                </Footer>
            </div>
        );
    },
);

export default Dashboard;
