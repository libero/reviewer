import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, boolean, button, number, text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { PeoplePicker } from '../../organisms';
import '../../../core/styles/index.scss';

let people = [
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
];

const addPerson = (): void => {
    const focuses = ['Tag 1', 'Tage 2'];
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
const removePerson = (id: string): void => {
    people = people.filter(person => person.id !== id);
    action(`Removed person ${id}`);
};

storiesOf('ui | organisms/PeoplePicker', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add(
        'SelectedPeopleList',
        (): JSX.Element => {
            const required = boolean('Required', false);
            const label = text('Label', 'People Picker');
            const min = number('Min', 2);
            const max = number('Max', 6);
            button('Add Person', addPerson);
            return (
                <PeoplePicker
                    required={required}
                    people={people}
                    onRemove={removePerson}
                    label={label}
                    min={min}
                    max={max}
                />
            );
        },
    );

