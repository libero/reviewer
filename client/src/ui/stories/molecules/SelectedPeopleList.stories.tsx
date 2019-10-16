import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, boolean, text, withKnobs } from '@storybook/addon-knobs';
import { SelectedPeopleList } from '../../molecules';
import '../../../core/styles/index.scss';

storiesOf('ui | molecules/SelectedPeopleList', module)
    .addDecorator(withKnobs)
    .add(
        'SelectedPeopleList',
        (): JSX.Element => {
            const required = boolean('Required', false);
            const openSelectorText = text('Open Picker Button text', 'Choose Editor');
            const people = object('Menu Items', [
                {
                    id: '1',
                    name: 'Name 1',
                    institution: 'Institution 1',
                    focuses: ['Tag 1', 'Tage 2'],
                    expertises: ['Tag 3'],
                },
                {
                    id: '2',
                    name: 'Name 2',
                    institution: 'Institution 2',
                    focuses: ['Tag 1', 'Tage 2'],
                    expertises: ['Tag 3'],
                },
                {
                    id: '3',
                    name: 'Name 3',
                    institution: 'Institution 3',
                    focuses: ['Tag 1', 'Tage 2'],
                    expertises: ['Tag 3'],
                },
            ]);
            return (
                <SelectedPeopleList
                    required={required}
                    openSelectorText={openSelectorText}
                    people={people}
                    onRemove={(id: string): void => action('onRemove')(id)}
                    onOpen={(): void => action('onOpen')()}
                />
            );
        },
    );
