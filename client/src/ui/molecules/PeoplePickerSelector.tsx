import React, { useState, useEffect } from 'react';
import { PersonProps, PersonPod, SearchField } from '.';
import { Modal } from '../atoms';

interface Props {
    people?: PersonProps[];
    initialySelected: string[];
    onDone: (selectedPeople: string[]) => void;
    label: string;
    toggle: Function;
    isShowing: boolean;
}

const PeoplePickerSelector = ({
    initialySelected,
    people = [],
    onDone,
    label,
    isShowing,
    toggle,
}: Props): JSX.Element => {
    const [locallySelected, setLocallySelected] = useState(initialySelected);
    useEffect((): void => {
        setLocallySelected(initialySelected);
    }, [initialySelected, isShowing]);

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
                <SearchField id="peoplePickerSearch" />
                <span className="typography__body typography__body--primary">BLAH!</span>
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
