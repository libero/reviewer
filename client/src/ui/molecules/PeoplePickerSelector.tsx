import React, { useState, useEffect } from 'react';
import { PersonProps, PersonPod, SearchField } from '.';
import { Modal } from '../atoms';
import useDebounce from '../hooks/useDebounce';

interface Props {
    people?: PersonProps[];
    initialySelected: string[];
    onDone: (selectedPeople: string[]) => void;
    onSearch: (value: string) => void;
    label: string;
    toggle: Function;
    isShowing: boolean;
}

const PeoplePickerSelector = ({
    initialySelected,
    people = [],
    onDone,
    onSearch,
    label,
    isShowing,
    toggle,
}: Props): JSX.Element => {
    const [locallySelected, setLocallySelected] = useState(initialySelected);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

    useEffect((): void => {
        setLocallySelected(initialySelected);
    }, [initialySelected, isShowing]);

    useEffect((): void => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const accept = (): void => {
        onDone(locallySelected);
    };
    const togglePerson = (id: string, selected: boolean): void => {
        if (!selected) {
            setLocallySelected(locallySelected.filter((listId: string): boolean => listId !== id));
        } else {
            setLocallySelected([...locallySelected, id]);
        }
    };

    return (
        <Modal
            hide={toggle}
            isShowing={isShowing}
            onAccept={accept}
            fullscreen={true}
            buttonType="primary"
            buttonText="Add"
        >
            <h2 className="typography__heading typography__heading--h2">{label}</h2>
            <div className="people-picker__search_box">
                <SearchField id="peoplePickerSearch" onChange={(event: React.FormEvent<HTMLInputElement>): void => setSearchTerm(event.currentTarget.value) }/>
                <span className="typography__body typography__body--primary people-picker__guidance">At least 2 suggestions required</span>
            </div>
            <div className="people-picker__modal_list">
                {people.map(
                    (person): React.ReactNode => {
                        const selected = locallySelected.includes(person.id);
                        return (
                            <div key={person.id} className="people-picker__modal_list--item">
                                <PersonPod {...person} toggleHandler={togglePerson} initialySelected={selected} />
                            </div>
                        );
                    },
                )}
            </div>
        </Modal>
    );
};

export default PeoplePickerSelector;
