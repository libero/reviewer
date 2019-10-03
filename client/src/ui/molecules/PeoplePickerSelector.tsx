import React, { useState, useEffect } from 'react';
import { PersonProps, PersonPod } from '.';
import { FixedSizeGrid as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Modal } from '../atoms';

interface Props {
    people: PersonProps[];
    initialySelected: string[];
    onDone: (selectedPeople: string[]) => void;
    label: string;
    toggle: Function;
    isShowing: boolean;
}

interface RendererProps {
    data: PersonProps[];
    rowIndex: number;
    columnIndex: number;
    style: React.CSSProperties;
}

const PeoplePickerSelector = ({ initialySelected, people, onDone, label, isShowing, toggle }: Props): JSX.Element => {
    const [locallySelected, setLocallySelected] = useState(initialySelected);
    useEffect(() => {
        setLocallySelected(initialySelected);
    }, [initialySelected]);
    
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

    const ItemRenderer = ({ rowIndex, columnIndex, data, style }: RendererProps): JSX.Element => {
        const person = data[rowIndex * 2 + columnIndex];
        const selected = person && locallySelected.includes(person.id);
        return person ? (
            <div key={person.id} style={style} className="people-picker__modal_list--item">
                <PersonPod {...person} toggleHandler={togglePerson} initialySelected={selected} />
            </div>
        ) : null;
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
            <div className="people-picker__modal_list">
                <AutoSizer>
                    {({ height, width }: { height: number; width: number }): JSX.Element => (
                        <List
                            height={height}
                            rowCount={Math.round((people.length + 1) / 2)}
                            columnCount={2}
                            columnWidth={(window.innerWidth * 0.66) / 2 - 5}
                            rowHeight={144}
                            width={width}
                            itemData={people}
                        >
                            {ItemRenderer}
                        </List>
                    )}
                </AutoSizer>
            </div>
        </Modal>
    );
};

export default PeoplePickerSelector;
