import React, { useState } from 'react';
import { request } from 'graphql-request';

declare var API_HOST: string;

const submissionQuery = `{
  getSubmissions {
    id, title
  }
}`;

const testData = {
  submissions: [
    {
      id: "1",
      title: "testing submission 1",
      lastStepVisited: "files",
      updated: "2019-06-20T10:00:13.977Z"
    },
    {
      id: "2",
      title: "testing submission 2",
      lastStepVisited: "disclosure",
      updated: "2019-04-20T10:00:13.977Z"
    }
  ]
}

interface Submission {
  title: string;
  id: string;
  lastStepVisited: string;
  updated: string;
}

const SubmissionEntry = ({submission}: {submission: Submission}) => {
  return (
    <div>
      <span style={{display: "block"}}>{submission.title}</span>
      <a href={`/submission/${submission.id}/${submission.lastStepVisited}`}>{submission.lastStepVisited}</a>
    </div>
  )
}

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
              {testData.submissions.map((sub) => (<SubmissionEntry submission={sub}/>))}
            </ul>
        </div>
    );
};

export default Dashboard;
