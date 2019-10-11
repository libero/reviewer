import React from 'react';
import Close from '@material-ui/icons/Close';

interface Props {
    text: string | (() => JSX.Element) | (() => JSX.Element[]);
    onClose?: () => void;
}

const SelectedOption: React.FC<Props> = ({ text, onClose }: Props): JSX.Element => {
    let classes = 'selected-option';

    if (onClose) {
        classes += ' selected-option--closeable';
    }

    return (
        <div className={classes}>
            <div className="selected-option__text">{text}</div>
            {onClose ? (
                <div className="selected-option__close">
                    <Close fontSize="inherit" onClick={onClose} />
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default SelectedOption;