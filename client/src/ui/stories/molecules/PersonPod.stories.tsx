import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { PersonPod } from '../../molecules';
import '../../../core/styles/index.scss';

storiesOf('ui | molecules/PersonPod', module)
    .addDecorator(centered)
    .add(
        'PersonPod',
        (): JSX.Element => {
            return (
                <PersonPod
                    initialySelected={false}
                    toggleHandler={(event: React.MouseEvent): void => action('toggles')(event)}
                />
            );
        },
    );
