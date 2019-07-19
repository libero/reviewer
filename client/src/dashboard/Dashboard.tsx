import React, { useState, Fragment, CSSProperties } from 'react';
import { request } from 'graphql-request';
import { Link } from 'react-router-dom';

declare var API_HOST: string;

const submissionQuery = `{
  getSubmissions {
    id, title
  }
}`;

const testData = {
    submissions: [
        {
            id: '1',
            title: 'testing submission 1',
            lastStepVisited: 'files',
            updated: '2019-06-20T10:00:13.977Z',
        },
        {
            id: '2',
            title: 'testing submission 2',
            lastStepVisited: 'disclosure',
            updated: '2019-04-20T10:00:13.977Z',
        },
    ],
};

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
                {submission.title}
            </span>
            <div style={{ width: '15%' }}>
                <span style={{ color: 'rgb(2, 136, 209)', cursor: 'pointer' }}>Continue Submission</span>
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
            .catch((): void => setFetched(true));
    }

    return (
        <div
            style={{
                marginLeft: '16%',
                marginRight: '16%',
                fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif, sans-serif',
            }}
        >
            <button
                style={{
                    // this should be moved into its own variable somewhere
                    float: 'right',
                    color: 'rgb(255, 255, 255)',
                    fontSize: '14px',
                    lineHeight: '18px',
                    textTransform: 'uppercase',
                    fontFamily: '"Noto Sans", Arial, Helvetica, sans- serif',
                    fontWeight: 700,
                    minWidth: '120px',
                    height: '48px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderImage: 'initial',
                    borderRadius: '3px',
                    background: 'rgb(2, 136, 209)',
                    padding: '12px 18px 9px',
                    borderColor: 'rgb(2, 136, 209)',
                }}
            >
                New Submission
            </button>
            <h2 style={{ paddingTop: '16px', paddingBottom: '32px' }}>Submissions</h2>
            <ul style={{ paddingLeft: 0 }}>
                {testData.submissions.length === 0 ? (
                    <div>You ain{"'"}t got no submissions</div>
                ) : (
                    testData.submissions.map((sub, index): unknown => <SubmissionEntry key={index} submission={sub} />)
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
