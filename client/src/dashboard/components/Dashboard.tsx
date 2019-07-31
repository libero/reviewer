import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getSubmissions, startSubmission } from '../../submission/submission.entities';
import { Submission } from '../../submission/types';
import moment from 'moment';
import { Button } from '../../ui/atoms';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Delete } from '@material-ui/icons';

const dashboardDateText = (date: Date): string => {
    const diffDays = moment(new Date()).diff(date, 'days');
    if (diffDays < 0 || Number.isNaN(diffDays)) {
        return 'Invalid date';
    }

    if (diffDays === 0) {
        return 'Today';
    }

    if (diffDays === 1) {
        return 'Yesterday';
    }

    if (diffDays < 14) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }

    if (diffDays < 30) {
        const diffWeeks = Math.round(diffDays / 7);
        return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    }

    if (diffDays < 730) {
        const diffMonths = Math.round(diffDays / 30);
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }
    const diffYears = Math.round(diffDays / 365);
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
};

interface Props {
    submission: Submission;
}

const SubmissionEntry: React.FC<Props> = ({ submission }: Props): JSX.Element => {
    const submissionTimeStamp: Date = new Date();
    submissionTimeStamp.setTime(Number.parseInt(submission.updated));
    return (
        // made the anchor tag into a span temporarily for styling.
        <div className="dashboard-entry">
            <Link
                className="dashboard-entry__link"
                to={`/submission/${submission.id}/${submission.lastStepVisited || 'title'}`}
            >
                <div className="dashboard-entry__content">
                    <span className="dashboard-entry__title">
                        {submission.title.length !== 0 ? submission.title : '(no title)'}
                    </span>
                    <div className="dashboard-entry__link_text">
                        <span>Continue Submission</span>
                    </div>
                    <div className="dashboard-entry__dates">
                        <time>{dashboardDateText(submissionTimeStamp)}</time>
                        <time className="dashboard-entry__date">
                            {moment(submissionTimeStamp).format('ddd D MMM YYYY')}
                        </time>
                    </div>
                </div>
            </Link>
            <div className="dashboard-entry__icon_container">
                <Delete className="dashboard-entry__icon" height="24" width="24" viewBox="3 3 18 18" />
            </div>
        </div>
    );
};

interface SubmissionListProps {
    submissions: Submission[];
}

const SubmissionList: React.FC<SubmissionListProps> = ({ submissions }: SubmissionListProps): JSX.Element => {
    return (
        <Tabs className="dashboard__tabs">
            <TabList className="dashboard__tabs_list">
                <Tab className="dashboard__tab" key="active">
                    Submissions
                </Tab>
                <Tab className="dashboard__tab" key="archived">
                    Archive
                </Tab>
            </TabList>
            <TabPanel className="dashboard__tab_panel" key="active">
                {submissions.length === 0 ? (
                    <div>You don{"'"}t have any submissions. Maybe you should make one?</div>
                ) : (
                    submissions
                        .reverse()
                        .map(
                            (sub: Submission, index: number): JSX.Element => (
                                <SubmissionEntry key={index} submission={sub} />
                            ),
                        )
                )}
            </TabPanel>
            <TabPanel className="dashboard__tab_panel" key="archived" />
        </Tabs>
    );
};

const Dashboard = withRouter(
    ({ history }): JSX.Element => {
        const [submissions, setSubmissions]: [Submission[], Function] = useState([
            {
                id: '1',
                lastStepVisited: 'step',
                title: 'bob',
                updated: new Date().toISOString(),
            },
        ]);
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
                        primary
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
                <div style={{ textAlign: 'center', color: 'rgb(136, 136, 136)' }}>
                    <p>
                        To find existing submissions or to submit a{' '}
                        <Link to="/author-guide/types">Research Advance</Link> please visit our{' '}
                        <a href="https://submit.elifesciences.org">full peer review and submissions system</a>{' '}
                    </p>
                </div>
            </div>
        );
    },
);

export default Dashboard;
