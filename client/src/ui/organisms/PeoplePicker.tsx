import React from 'react';
import { PersonProps, SelectedPeopleList, PersonPod } from '../molecules';
import useModal from '../../ui/hooks/useModal';
import { Modal } from '../atoms';
import { Delete } from '@material-ui/icons';
import { FixedSizeGrid as List } from 'react-window';

interface Props {
    people?: PersonProps[];
    selectedPeople?: PersonProps[];
    label: string;
    required: boolean;
    min?: number;
    max?: number;
    onRemove: (personId: string) => void;
}

interface RendererProps {
    data: PersonProps[];
    rowIndex: number;
    columnIndex: number;
}

const PeoplePicker = ({ people = [], label, required, min, max, onRemove }: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();

    const ItemRenderer = ({ rowIndex, columnIndex, data }: RendererProps): JSX.Element => {
        const person = data[rowIndex * 2 + columnIndex];
        return person ? (
            <div className="people-picker__modal_list--item">
                <PersonPod {...person} toggleHandler={onRemove} selectedButtonIcon={<Delete />} initialySelected />
            </div>
        ) : null;
    };

    return (
        <div className="people-picker">
            <h2 className="typography__heading typography__heading--h2">{label}</h2>
            <SelectedPeopleList
                people={people}
                required={required}
                onRemove={onRemove}
                onOpen={(): void => toggle()}
                openSelectorText="bob"
            />
            <Modal
                hide={toggle}
                isShowing={isShowing}
                onAccept={(): void => {}}
                fullscreen={true}
                buttonType="primary"
                buttonText="Add"
            >
                <h2 className="typography__heading typography__heading--h2">{label}</h2>
                <div className="people-picker__modal_list">
                    <List
                        height={window.innerHeight - 138}
                        rowCount={Math.round((people.length + 1) / 2)}
                        columnCount={2}
                        columnWidth={(window.innerWidth * 0.66) / 2}
                        rowHeight={144}
                        width={window.innerWidth * 0.66}
                        itemData={people}
                    >
                        {ItemRenderer}
                    </List>
                </div>
            </Modal>
        </div>
    );
};

export default PeoplePicker;
