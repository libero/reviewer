import React from 'react';
import { storiesOf } from '@storybook/react';
import SubmissionList from '../components/SubmissionList';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';
import { object, withKnobs } from '@storybook/addon-knobs';
import { Submission } from '../../initial-submission/types';
import getMockSubmissionForDaysAgo from './storyUtils';

const historyLocation: LocationDescriptor[] = ['/'];

const notes = `
   # SubmissionList
   ## Styling
   | ClassName | Description |
   | -----------| -------------| 
   | .dashboard__tabs | The outer container for the tabs container |
   | .dashboard__tabs_list | The container for the tabs |
   | .dashboard__tab | Styling for the tab itself |
   | .dashboard__tab_panel | Styling for the tab panel container |
`;

storiesOf('Dashboard | Components/SubmissionList', module)
    .addDecorator(withKnobs)
    .add(
        'With Components',
        (): JSX.Element => {
            const submissionsTyped: Submission[] = [
                {
                    id: 'id1',
                    title: 'Theory of Everything',
                    lastStepVisited: 'author',
                    status: 'CONTINUE_SUBMISSION',
                    updated: new Date().getTime(),
                },
                {
                    id: 'id2',
                    title: 'Theory of Nothing',
                    lastStepVisited: 'files',
                    status: 'SUBMITTED',
                    updated: getMockSubmissionForDaysAgo(7),
                },
            ];
            const submissions = object('Submissions', submissionsTyped);
            return (
                <MemoryRouter initialEntries={historyLocation}>
                    <SubmissionList submissions={submissions} />
                </MemoryRouter>
            );
        },
        {
            notes: { markdown: notes },
        },
    );
