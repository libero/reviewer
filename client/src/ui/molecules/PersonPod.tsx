import React, { useState, MouseEvent } from 'react';
import { Pod, Modal } from '../atoms';
import PersonInfo from './PersonInfo';
import { Add, CheckCircle, Info } from '@material-ui/icons';
import useModal from '../../ui/hooks/useModal';

interface Props {
    initialySelected?: boolean;
    toggleHandler(event: MouseEvent): void;
    name?: string;
    institution?: string;
    focuses?: string[];
    expertises?: string[];
}

const PersonPod = ({
    initialySelected,
    toggleHandler,
    institution,
    name,
    focuses = [],
    expertises = [],
}: Props): JSX.Element => {
    const [selected, setSelected] = useState(initialySelected || false);
    const { isShowing, toggle } = useModal();

    const onClick = (event: MouseEvent): void => {
        setSelected(!selected);
        toggleHandler(event);
    };
    const commaSeperatedTags = [...focuses, ...expertises].join(', ');
    return (
        <Pod
            buttonIcon={
                selected ? (
                    <CheckCircle data-selected="true" fontSize="large" className="person-pod__selected_icon" />
                ) : (
                    <Add />
                )
            }
            buttonText="Add"
            onClick={onClick}
        >
            <Modal
                hide={toggle}
                isShowing={isShowing}
                onAccept={onClick}
                buttonType="primary"
                buttonText={`${selected ? 'Remove' : 'Add'} Editor`}
            >
                <PersonInfo name={name} institution={institution} focuses={focuses} expertises={expertises} />
            </Modal>
            <div className="person-pod__text">
                <span className="typography__body typography__body--primary typography__body--no-margin">{name}</span>
                <span className="typography__small typography__small--primary typography__small--no-margin">
                    {institution}
                </span>
                <div className="person-pod__inline_text">
                    <Info
                        aria-label="Info"
                        className="person-pod__info_icon"
                        fontSize="small"
                        onClick={(): void => toggle()}
                    />
                    <span className="typography__small typography__small--secondary typography__small--no-margin">
                        {commaSeperatedTags}
                    </span>
                </div>
            </div>
        </Pod>
    );
};

export default PersonPod;
