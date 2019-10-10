import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, button, number, text, withKnobs } from '@storybook/addon-knobs';
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

const PeoplePickerStory = (): JSX.Element => {
    const [selectedPeople, setSelectedPeople] = useState<string[]>(['1']);
    const [filteredPeople, setFilteredPeople] = useState(people);

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
        setFilteredPeople(people);
        action(`Added person ${id}`)();
    };

    const removePerson = (id: string): void => {
        setSelectedPeople(selectedPeople.filter((personId: string): boolean => personId !== id));
        action(`Removed person ${id}`)();
    };

    const onSearch = (value: string) => {
        setFilteredPeople(
            people.filter(person =>
                `${person.name} ${person.institution} ${person.expertises} ${person.focuses}`.includes(value),
            ),
        );
        action('Search filter')(value);
    };

    const required = boolean('Required', false);
    const label = text('Label', 'People Picker');
    const min = number('Min', 2);
    const max = number('Max', 6);

    button('Add Person', addPerson);
    button('Add 20 People', (): void => {
        for (let i = 0; i < 20; i++) {
            addPerson();
        }
    });

    return (
        <PeoplePicker
            required={required}
            people={filteredPeople}
            selectedPeople={selectedPeople}
            onRemove={removePerson}
            onSearch={onSearch}
            label={label}
            min={min}
            max={max}
            setSelectedPeople={(selectedPeople: string[]): void => setSelectedPeople(selectedPeople)}
        />
    );
};

storiesOf('ui | organisms/PeoplePicker', module)
    .addDecorator(withKnobs)
    .add('PeoplePicker', (): JSX.Element => <PeoplePickerStory />);
