import React, { useState, MouseEvent } from 'react';
import { Pod, Modal } from '../atoms';
import PersonInfo from './PersonInfo';
import { Add, CheckCircle, Info } from '@material-ui/icons';
import useModal from '../../ui/hooks/useModal';

export interface PersonProps {
    name?: string;
    institution?: string;
    focuses?: string[];
    expertises?: string[];
    id?: string;
}

interface Props extends PersonProps {
    initialySelected?: boolean;
    toggleHandler(id: string): void;
    selectedButtonIcon?: JSX.Element;
}

const PersonPod = ({
    id,
    initialySelected,
    toggleHandler,
    institution,
    name,
    focuses = [],
    expertises = [],
    selectedButtonIcon = <CheckCircle data-selected="true" fontSize="large" className="person-pod__selected_icon" />,
}: Props): JSX.Element => {
    const [selected, setSelected] = useState(initialySelected || false);
    const { isShowing, toggle } = useModal();

    const onClick = (id: string): void => {
        setSelected(!selected);
        toggleHandler(id);
    };
    const commaSeperatedTags = [...focuses, ...expertises].join(', ');
    return (
        <Pod
            buttonIcon={selected ? selectedButtonIcon : <Add />}
            buttonText={selected ? 'Remove' : 'Add'}
            onClick={() => onClick(id)}
        >
            <Modal
                hide={toggle}
                isShowing={isShowing}
                onAccept={() => onClick(id)}
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
