import React, { useState } from 'react';
import Button from '../components-core/Button';
import { request } from 'graphql-request';
import { Submission, getSubmission } from './submission.entities';

declare var API_HOST: string;

const Submission = ({ match }: { match: any }) => {
    const [submission, updateSubmission] = useState<Submission>(undefined);
    const [submissionFetched, setSubmissionFetched] = useState<boolean>(false);

    if (!submissionFetched) {
        getSubmission(match.params.id)
            .then((fetchedSubmission: Submission) => {
                updateSubmission(fetchedSubmission);
                setSubmissionFetched(true);
            })
            .catch((): void => setSubmissionFetched(true));
    }

    return (
        <div
            style={{
                marginRight: '33%',
                marginLeft: '33%',
                marginTop: '150px',
                fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif, sans-serif',
            }}
        >
            <h1> Submission</h1>
            {JSON.stringify(match.params)}
            <TitleEntry placeholder="enter yo title here" initialValue={submission && submission.title} />
            <Button text="Submit" />
        </div>
    );
};

const TitleEntry = ({ initialValue, placeholder }: { placeholder: string; initialValue?: string }) => {
    const [touched, setTouched] = useState<boolean>(false);
    return (
        <div
            style={{
                padding: '24px 0px 24px 0px',
            }}
        >
            <span
                style={{
                    display: 'block',
                    fontSize: '14px',
                }}
            >
                Manuscript Title {touched ? '*' : ''}
            </span>
            <input
                style={{
                    width: '100%',
                    borderRadius: '3px',
                    border: '1px solid rgb(224, 224, 224)',
                    fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    lineHeight: '24px',
                    padding: '12px',
                    height: '48px',
                }}
                name="title"
                type="Text"
                placeholder={placeholder}
                onChange={(): void => {
                    setTouched(true);
                }}
                // Use the updated value, otherwise set to the existing initial value
                value={touched ? undefined : initialValue}
            />
        </div>
    );
};

export default Submission;
