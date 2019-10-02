import React from 'react';
import { PeoplePickerSelector, PersonProps, SelectedPeopleList } from '../molecules';
import useModal from '../../ui/hooks/useModal';

interface Props {
    people?: PersonProps[];
    selectedPeople?: PersonProps[];
    label: string;
    required: boolean;
    min?: number;
    max?: number;
    onRemove: (personId: string) => void;
    setSelectedPeople: (selectedPeople: PersonProps[]) => void;
}

const PeoplePicker = ({
    people = [],
    selectedPeople = [],
    label,
    required,
    min,
    max,
    onRemove,
    setSelectedPeople,
}: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();

    return (
        <div className="people-picker">
            <h2 className="typography__heading typography__heading--h2">{label}</h2>
            <SelectedPeopleList
                people={selectedPeople}
                required={required}
                onRemove={onRemove}
                onOpen={(): void => toggle()}
                openSelectorText="bob"
            />
            <PeoplePickerSelector
                people={people}
                initialySelected={selectedPeople}
                onDone={setSelectedPeople}
                label={label}
                toggle={toggle}
                isShowing={isShowing}
            />
        </div>
    );
};

export default PeoplePicker;
