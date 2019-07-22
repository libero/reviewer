import React, { useState, Fragment, CSSProperties } from 'react';
import { request } from 'graphql-request';
import { Link, withRouter } from 'react-router-dom';
import Button from '../components-core/Button';
import { getSubmissions, startSubmission } from '../submission/submission.entities';
import { Submission } from '../submission/types';
import moment from 'moment';
import '../../styles/dashboard.scss'

const SubmissionEntry = ({ submission }: { submission: Submission }) => {
    const submissionTimeStamp = new Date();
    submissionTimeStamp.setTime(Number.parseInt(submission.updated));
    return (
        // made the anchor tag into a span temporarily for styling.
        <div className='dashboard-entry'>
            <span className='dashboard-entry-title'>
                {submission.title.length !== 0 ? submission.title : '(no title)'}
            </span>
            <div>
                <Link className='dashboard-entry-link' to={`/submission/${submission.id}/${submission.lastStepVisited || 'title'}`}>
                    <span>Continue Submission</span>
                </Link>
            </div>
            <div>
                <span className='dashboard-entry-date-since'>
                    {moment(submissionTimeStamp.toISOString()).fromNow()}
                </span>
                <span className='dashboard-entry-date'>
                    {moment(submissionTimeStamp.toISOString()).calendar()}
                </span>
            </div>
        </div>
    );
};

const Dashboard = withRouter(({ history }) => {
    const [submissions, setSubmissions] = useState([]);
    const [fetched, setFetched] = useState(false);

    // only fetch once to prevent render loop
    if (!fetched) {
        getSubmissions()
            .then(
                (fetchedSubmissions: Submission[]): void => {
                    setSubmissions(fetchedSubmissions);
                    setFetched(true);
                },
            )
            .catch(
                (): void => {
                    setFetched(true);
                },
            );
    }

    return (
        <div className='dashboard'>
            <Button
                float="right"
                text={'New Submission'}
                onClick={(): void => {
                    startSubmission().then(
                        (submission): void => {
                            history.push(`/submission/${submission.id}/title`);
                        },
                    );
                }}
            />
            <h2 style={{ paddingTop: '16px', paddingBottom: '32px' }}>Submissions</h2>
            <ul style={{ paddingLeft: 0 }}>
                {submissions.length === 0 ? (
                    <div>You don{"'"}t have any submissions. Maybe you should make one?</div>
                ) : (
                    submissions.reverse().map((sub, index): unknown => <SubmissionEntry key={index} submission={sub} />)
                )}
            </ul>
            <div style={{ textAlign: 'center', color: 'rgb(136, 136, 136)' }}>
                <p>
                    To find existing submissions or to submit a <Link to="/author-guide/types">Research Advance</Link>{' '}
                    please visit our{' '}
                    <a href="https://submit.elifesciences.org">full peer review and submissions system</a>{' '}
                </p>
            </div>
        </div>
    );
});

export default Dashboard;
