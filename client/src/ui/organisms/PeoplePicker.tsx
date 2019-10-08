import React from 'react';
import { PeoplePickerSelector, PersonProps, SelectedPeopleList } from '../molecules';
import useModal from '../../ui/hooks/useModal';

interface Props {
    people?: PersonProps[];
    selectedPeople?: string[];
    label: string;
    required: boolean;
    min?: number;
    max?: number;
    onRemove: (personId: string) => void;
    onSearch: (value: string) => void;
    setSelectedPeople: (selectedPeople: string[]) => void;
}

const PeoplePicker = ({
    people = [],
    selectedPeople = [],
    label,
    required,
    min,
    max,
    onRemove,
    onSearch,
    setSelectedPeople,
}: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    
    return (
        <div className="people-picker">
            <h2 className="typography__heading typography__heading--h2">{label}</h2>
            <SelectedPeopleList
                people={people.filter(person => selectedPeople.includes(person.id))}
                required={required}
                onRemove={onRemove}
                onOpen={(): void => toggle()}
                openSelectorText="bob"
            />
            <PeoplePickerSelector
                people={people}
                initialySelected={selectedPeople}
                onDone={setSelectedPeople}
                onSearch={onSearch}
                label={label}
                toggle={toggle}
                isShowing={isShowing}
                min={min}
            />
        </div>
    );
};

export default PeoplePicker;
