import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from '../components/Dashboard';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';

const historyLocation: LocationDescriptor[] = ['/'];

const notes = `
   # Dashboard
   ## Styling
   | ClassName | Description |
   | -----------| -------------| 
   | .dashboard | The outer container for the dashboard component |
   | .dashboard__button_container | The container for the action button |
`;

storiesOf('Dashboard | Components/Dashboard', module).add(
    'With Components',
    (): JSX.Element => {
        return (
            <MemoryRouter initialEntries={historyLocation}>
                <Dashboard />
            </MemoryRouter>
        );
    },
    {
        notes: { markdown: notes },
    },
);
