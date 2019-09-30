import React from 'react';
import { PersonProps, SelectedPeopleList } from '../molecules';
import useModal from '../../ui/hooks/useModal';
import { Modal } from '../atoms';

interface Props {
    people?: PersonProps[];
    selectedPeople?: PersonProps[];
    label: string;
    required: boolean;
    min?: number;
    max?: number;
    onRemove: (personId: string) => void;
}

const PeoplePicker = ({ people = [], label, required, min, max, onRemove }: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    return (
        <div className="people-picker">
            <h2 className="typography__heading typography__heading--h2">{label}</h2>
            <SelectedPeopleList
                people={people}
                required={required}
                onRemove={onRemove}
                onOpen={(): void => toggle()}
                openSelectorText="bob"
            />{' '}
            <Modal
                hide={toggle}
                isShowing={isShowing}
                onAccept={(): void => {}}
                fullscreen={true}
                buttonType="primary"
                buttonText="Add"
            >
                <h2 className="typography__heading typography__heading--h2">{label}</h2>
            </Modal>
        </div>
    );
};

export default PeoplePicker;
