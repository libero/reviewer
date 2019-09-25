import React, { useState, MouseEvent } from 'react';
import { Pod } from '../atoms';
import { Add, CheckCircle, Info } from '@material-ui/icons';

export interface PersonProps {
    name?: string;
    institution?: string;
    tags?: string[];
    id?: string;
}

interface Props extends PersonProps {
    initialySelected?: boolean;
    toggleHandler(event: MouseEvent): void;
    selectedButtonIcon?: JSX.Element;
}

const PersonPod = ({
    initialySelected,
    toggleHandler,
    institution,
    name,
    tags = [],
    selectedButtonIcon = <CheckCircle data-selected="true" fontSize="large" className="person-pod__selected_icon" />,
}: Props): JSX.Element => {
    const [selected, setSelected] = useState(initialySelected || false);
    const onClick = (event: MouseEvent): void => {
        setSelected(!selected);
        toggleHandler(event);
    };
    const commaSeperatedTags = tags.join(', ');
    return (
        <Pod buttonIcon={selected ? selectedButtonIcon : <Add />} buttonText="Add" onClick={onClick}>
            <div className="person-pod__text">
                <span className="typography__body typography__body--primary typography__body--no-margin">{name}</span>
                <span className="typography__small typography__small--primary typography__small--no-margin">
                    {institution}
                </span>
                <div className="person-pod__inline_text">
                    <Info fontSize="small" />
                    <span className="typography__small typography__small--secondary typography__small--no-margin">
                        {commaSeperatedTags}
                    </span>
                </div>
            </div>
        </Pod>
    );
};

export default PersonPod;
