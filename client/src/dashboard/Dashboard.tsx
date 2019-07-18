import React, { useState, Fragment, CSSProperties } from 'react';
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

const SubmissionEntry = ({ submission }: { submission: Submission }) => {
  return (// made the anchor tag into a span temporarily for styling.
    <div style={{ width: '100%', display: 'flex', flex: '1 0 auto', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgb(224, 224, 224)' }}>
      <span style={{ fontFamily: '"Noto Sans SemiBold", Arial, Helvetica, sans-serif', fontSize: '16px', fontWeight: 400, padding: '24px 0 24px 0' }}>{submission.title}</span>
      <span style={{color: 'rgb(2, 136, 209)', cursor: 'pointer'}}>Continue Submission</span> 
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
    <div style={{ marginLeft: '33%', marginRight: '33%', fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif, sans-serif' }}>
      <h2 style={{ paddingTop: '16px', paddingBottom: '32px' }}>Submissions</h2>
      <button style={{ // this should be moved into its own variable somewhere
        float: 'right',
        color: 'rgb(255, 255, 255)',
        fontSize: '14px',
        lineHeight: '18px',
        textTransform: 'uppercase',
        fontFamily: '"Noto Sans SemiBold", Arial, Helvetica, sans- serif',
        fontWeight: 400,
        minWidth: '120px',
        height: '48px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderImage: 'initial',
        borderRadius: '3px',
        background: 'rgb(2, 136, 209)',
        padding: '12px 18px 9px',
        borderColor: 'rgb(2, 136, 209)'
      }}>New Submission</button>
      <ul style={{ paddingLeft: 0 }}>
        {testData.submissions.map((sub) => (<SubmissionEntry submission={sub} />))}
      </ul>
    </div >
  );
};



export default Dashboard;
