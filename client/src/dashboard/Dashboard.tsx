import React, { useState, Fragment, CSSProperties } from 'react';
import { request } from 'graphql-request';
import { Link } from 'react-router-dom';
import Button from '../components-core/Button';

declare var API_HOST: string;

const submissionQuery = `{
  getSubmissions {
    id, title, updated
  }
}`;

interface Submission {
    title: string;
    id: string;
    lastStepVisited: string;
    updated: string;
}

const SubmissionEntry = ({ submission }: { submission: Submission }) => {
    return (
        // made the anchor tag into a span temporarily for styling.
        <div
            style={{
                width: '100%',
                display: 'flex',
                flex: '1 0 auto',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgb(224, 224, 224)',
            }}
        >
            <span
                style={{
                    width: '60%',
                    fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    padding: '24px 0 24px 0',
                }}
            >
                {submission.title.length !== 0 ? submission.title : '(no title)'}
            </span>
            <div style={{ width: '15%' }}>
                <Link
                    to={`/submission/${submission.id}/${submission.lastStepVisited || 'title'}`}
                    style={{ textDecoration: 'none' }}
                >
                    <span style={{ color: 'rgb(2, 136, 209)', cursor: 'pointer' }}>Continue Submission</span>
                </Link>
            </div>
            <div style={{ width: '15%' }}>
                <span style={{ color: 'rgb(136, 136, 136)', display: 'block' }}>3 Weeks Ago</span>
                <span style={{ color: 'rgb(136, 136, 136)', fontSize: '12px' }}>{submission.updated}</span>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [fetched, setFetched] = useState(false);

    // only fetch once to prevent render loop
    if (!fetched) {
        request(API_HOST + '/graphql', submissionQuery)
            .then(
                ({ getSubmissions }): void => {
                    setFetched(true);
                    setSubmissions(getSubmissions);
                },
            )
            .catch((): void => setFetched(false));
    }

    return (
        <div
            style={{
                marginLeft: '16%',
                marginRight: '16%',
                fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif, sans-serif',
            }}
        >
            <Button float="right" text={'New Submission'} />
            <h2 style={{ paddingTop: '16px', paddingBottom: '32px' }}>Submissions</h2>
            <ul style={{ paddingLeft: 0 }}>
                {submissions.length === 0 ? (
                    <div>You don{"'"}t have any submissions. Maybe you should make one?</div>
                ) : (
                    submissions.map((sub, index): unknown => <SubmissionEntry key={index} submission={sub} />)
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
};

export default Dashboard;
