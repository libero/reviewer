import React from 'react';
import { storiesOf } from '@storybook/react';
import Delete from '@material-ui/icons/Delete';
import { action } from '@storybook/addon-actions';
import { text, withKnobs, boolean } from '@storybook/addon-knobs';
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
            const tags = text('Tags', 'Tag 1,Tag 2').split(',');
            const deleteIcon = boolean('Selected uses delete icon?', false);
            return (
                <PersonPod
                    initialySelected={false}
                    tags={tags}
                    name={name}
                    institution={institution}
                    selectedButtonIcon={deleteIcon ? <Delete /> : undefined}
                    toggleHandler={(event: React.MouseEvent): void => action('toggles')(event)}
                />
            );
        },
    );
