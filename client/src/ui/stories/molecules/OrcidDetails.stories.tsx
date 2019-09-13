import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { OrcidDetails, AuthorDetails } from '../../molecules';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';

const getDetails = (): AuthorDetails => {
    action('Prefilled Details')();
    return {
        authorFirstName: 'Bob',
        authorLastName: 'Ross',
        authorEmail: 'a@b.com',
        institution: 'Happy Little Trees',
    };
};

storiesOf('ui | molecules/OrcidDetails', module)
    .addDecorator(centered)
    .add(
        'OrcidDetails',
        (): JSX.Element => {
            return <OrcidDetails getOrcidDetails={getDetails} />;
        },
    );
