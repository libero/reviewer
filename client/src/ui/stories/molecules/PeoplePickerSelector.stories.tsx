import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs, boolean, button, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { PeoplePickerSelector } from '../../molecules';
import '../../../core/styles/index.scss';

let people = [
    {
        id: '1',
        name: 'Name 1',
        institution: 'Institution 1',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '2',
        name: 'Name 2',
        institution: 'Institution 2',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
    {
        id: '3',
        name: 'Name 3',
        institution: 'Institution 3',
        focuses: ['Tag 1', 'Tag 2'],
        expertises: ['Tag 3'],
    },
];

const addPerson = (): void => {
    const focuses = ['Tag 1', 'Tag 2'];
    const expertises = ['Tag 3'];
    const id = (Number.parseInt(people[people.length - 1].id) + 1).toString();
    people.push({
        id: id,
        name: `Name ${id}`,
        institution: `Institution ${id}`,
        focuses: focuses,
        expertises: expertises,
    });
    action(`Added person ${id}`)();
};

storiesOf('ui | molecules/PeoplePickerSelector', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'PeoplePickerSelector',
        (): JSX.Element => {
            const label = text('Label', 'People Picker');
            const isShowing = boolean('Shown', true);
            const min = number('Minimum required people', 2);
            const max = number('Maximum allowed people', 6);

            button('Add Person', addPerson);
            return (
                <PeoplePickerSelector
                    people={people}
                    initialySelected={[]}
                    label={label}
                    onDone={action('Done')}
                    onSearch={action('Search')}
                    toggle={() => {}}
                    isShowing={isShowing}
                    min={min}
                    max={max}
                />
            );
        },
    );
