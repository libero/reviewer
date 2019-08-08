import React from 'react';
import { storiesOf } from '@storybook/react';
import SubmissionEntry from '../components/SubmissionEntry';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { Submission } from '../../initial-submission/types';

const historyLocation: LocationDescriptor[] = ['/'];

const notes = `
   # SubmissionEntry
   ## Styling
   | ClassName | Description |
   | -----------| -------------| 
   | .submission-entry | The outer container for the row |
   | .submission-entry__link | The styling for the outer anchor tag and title text|
   | .submission-entry__link--{status} | Overrides for the different statuses of the submission (default: 'CONTINUE_SUBMISSION', 'SUBMITTED', 'REJECTED' |
   | .submission-entry__content | Styling for the container of status and date elements |
   | .submission-entry__link_text | Styling for the container of the status text |
   | .submission-entry__link_text--{status} | Overrides for the different statuses of the submission (default: 'CONTINUE_SUBMISSION', 'SUBMITTED', 'REJECTED' |
   | .submission-entry__dates | The dates container |
   | .submission-entry__date | The date text |
   | .submission-entry__icon_container | The icon container |
   | .submission-entry__icon | The icon |
`;

storiesOf('Dashboard | Components/SubmissionEntry', module)
    .addDecorator(withKnobs)
    .add(
        'With Components',
        (): JSX.Element => {
            const submission: Submission = {
                id: 'id1',
                title: text('Title', 'Theory of Everything'),
                lastStepVisited: 'author',
                status: select('Status', ['CONTINUE_SUBMISSION', 'SUBMITTED', 'REJECTED'], 'CONTINUE_SUBMISSION'),
                updated: new Date().getTime(),
            };
            return (
                <MemoryRouter initialEntries={historyLocation}>
                    <SubmissionEntry submission={submission} />
                </MemoryRouter>
            );
        },
        {
            notes: { markdown: notes },
        },
    );
