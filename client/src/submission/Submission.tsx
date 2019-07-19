import React, { useState } from 'react';
import Button from '../components-core/Button';

const Submission = ({ match }: { match: any }) => {
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
            <TitleEntry defaultValue={match.params.id} />
            <Button text="Submit" />
        </div>
    );
};

const TitleEntry = ({ defaultValue }: { defaultValue: string }) => {
    const [submission, updateSubmission] = useState({});
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
                Manuscript Title
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
                placeholder="Enter title here"
            />
        </div>
    );
};

export default Submission;
