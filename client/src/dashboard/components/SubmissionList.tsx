import React from 'react';
import { Submission } from '../../initial-submission/types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SubmissionEntry from './SubmissionEntry';

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

export default SubmissionList;
