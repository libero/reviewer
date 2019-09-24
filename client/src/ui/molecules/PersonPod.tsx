import React, { useState, MouseEvent } from 'react';
import { Pod } from '../atoms';
import { Add, CheckCircle, Info } from '@material-ui/icons';

interface Props {
    initialySelected?: boolean;
    toggleHandler(event: MouseEvent): void;
}

const PersonPod = ({ initialySelected, toggleHandler }: Props): JSX.Element => {
    const [selected, setSelected] = useState(initialySelected || false);
    const onClick = (event: MouseEvent): void => {
        setSelected(!selected);
        toggleHandler(event);
    };
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
            <div className="person-pod__text">
                <span className="typography__body typography__body--primary typography__body--no-margin">Bob Ross</span>
                <span className="typography__small typography__small--primary typography__small--no-margin">
                    Little Happy Trees
                </span>
                <div className="person-pod__inline_text">
                    <Info fontSize="small" />
                    <span className="typography__small typography__small--secondary typography__small--no-margin">
                        Happy, Little, Trees
                    </span>
                </div>
            </div>
        </Pod>
    );
};

export default PersonPod;
