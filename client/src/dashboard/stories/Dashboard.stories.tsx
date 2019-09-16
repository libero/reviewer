import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from '../components/Dashboard';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { getSubmissionsQuery } from '../graphql';

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
        const getSubmissions: MockedResponse = {
            request: {
                query: getSubmissionsQuery,
            },
            result: {
                data: {
                    getSubmissions: [],
                },
            },
        };

        return (
            <MockedProvider mocks={[getSubmissions]} addTypename={false}>
                <MemoryRouter initialEntries={historyLocation}>
                    <Dashboard />
                </MemoryRouter>
            </MockedProvider>
        );
    },
    {
        notes: { markdown: notes },
    },
);
