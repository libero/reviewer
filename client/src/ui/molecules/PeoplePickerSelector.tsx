import React, { useState, useEffect, useRef } from 'react';
import { PersonProps, PersonPod } from '.';
import { FixedSizeGrid as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Modal } from '../atoms';
import useElementSize from '../hooks/useElementSize';

interface Props {
    people?: PersonProps[];
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

const PeoplePickerSelector = ({
    initialySelected,
    people = [],
    onDone,
    label,
    isShowing,
    toggle,
}: Props): JSX.Element => {
    const [locallySelected, setLocallySelected] = useState(initialySelected);
    const { elementRef, size, handleResize } = useElementSize();
    useEffect((): void => {
        setLocallySelected(initialySelected);
        handleResize();
    }, [initialySelected, isShowing]);
    const ref = useRef<HTMLHeadingElement>(null);
    

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

    let h2Styles;
    let h2Height = 0;
    if (ref.current) {
        h2Styles = window.getComputedStyle(ref.current);
        h2Height = Number.parseInt(h2Styles.marginBottom) + Number.parseInt(h2Styles.marginTop) + ref.current.offsetHeight;
    }

    return (
        <Modal            
            hide={toggle}
            isShowing={isShowing}
            onAccept={accept}
            fullscreen={true}
            buttonType="primary"
            buttonText="Add"
            ref={elementRef} 
        >
            <h2 ref={ref} className="typography__heading typography__heading--h2">{label}</h2>
            <div className="people-picker__modal_list">
                <List
                    height={size.height - h2Height}
                    rowCount={Math.round((people.length + 1) / 2)}
                    columnCount={2}
                    columnWidth={(window.innerWidth * 0.66) / 2 - 5}
                    rowHeight={144}
                    width={size.width * 0.66}
                    itemData={people}
                >
                    {ItemRenderer}
                </List>
            </div>
        </Modal>
    );
};

export default PeoplePickerSelector;
