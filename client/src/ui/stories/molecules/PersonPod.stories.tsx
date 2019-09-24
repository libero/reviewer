import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { PersonPod } from '../../molecules';
import '../../../core/styles/index.scss';

storiesOf('ui | molecules/PersonPod', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'PersonPod',
        (): JSX.Element => {
            const name = text('Name', 'Bob Ross');
            const institution = text('Institution', 'Little Happy Trees');
            const tags = text('Tags','Tag 1, Tage 2').split(',');
            return (
                <PersonPod
                    initialySelected={false}
                    tags={tags}
                    name={name}
                    institution={institution}
                    toggleHandler={(event: React.MouseEvent): void => action('toggles')(event)}
                />
            );
        },
    );
