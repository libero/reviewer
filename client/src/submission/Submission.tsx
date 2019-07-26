import React, { useState } from 'react';
import { Submission } from './types';

declare var API_HOST: string;

const Submission = (/*{ match }: RouteComponentProps*/): JSX.Element => {
    //const [submission, updateSubmission] = useState<Submission>(undefined);
    //const [submissionFetched, setSubmissionFetched] = useState<boolean>(false);
    const [hasSubmitted /* setHasSubmitted */] = useState<boolean>(false);

    // if (!submissionFetched) {
    //     getSubmission(match.params.id)
    //         .then((fetchedSubmission: Submission) => {
    //             updateSubmission(fetchedSubmission);
    //             setSubmissionFetched(true);
    //         })
    //         // TODO: Better handle error states
    //         .catch((): void => setSubmissionFetched(true));
    // }

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
            {/* <input
                label="Manuscript Title"
                placeholder="enter yo title here"
                initialValue={submission && submission.title}
                touchedNote={!hasSubmitted ? 'unsaved' : undefined}
                onChange={(ev): void => {
                    updateSubmission({
                        ...submission,
                        title: ev.target.value,
                    });
                    setHasSubmitted(false);
                }}
            /> */}
            <div>
                {/* <Button
                    text="Submit"
                    onClick={(): void => {
                        setSubmissionTitle(submission.id, submission.title);
                        setHasSubmitted(true);
                    }}
                /> */}
                {hasSubmitted ? (
                    <span
                        style={{
                            height: 48,
                            padding: '12px 18px 9px',
                            fontSize: '14px',
                            lineHeight: '18px',
                            display: 'inline-block',
                        }}
                    >
                        {' '}
                        💾 Saved!{' '}
                    </span>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
export default Submission;
