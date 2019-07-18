import React, { useState } from 'react';
import { request } from 'graphql-request';

declare var API_HOST: string;

const submissionQuery = `{
  getSubmissions {
    id, title
  }
}`;

const Dashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [fetched, setFetched] = useState(false);

    // only fetch once to prevent render loop
    if (!fetched) {
        request(API_HOST + '/graphql', submissionQuery)
            .then(({ getSubmissions }) => {
                setFetched(true);
                setSubmissions(getSubmissions);
            })
            .catch(() => setFetched(true));
    }

    return (
        <div>
            Submissions <br></br>
            <ul>
                {submissions.map(submission => (
                    <li key={submission.id}>{submission.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
