import React, { ReactNode, MouseEvent } from 'react';

interface Props {
    onClick: (event: MouseEvent) => void;
    buttonIcon: JSX.Element;
    buttonText: string;
    children?: ReactNode;
    invalid?: boolean;
}

const Pod = ({ children, buttonIcon, buttonText, onClick, invalid = false }: Props): JSX.Element => (
    <div className={`pod ${invalid ? 'pod__error' : ''}`}>
        <div className="pod__body">{children}</div>
        <button onClick={onClick} className="pod__button">
            {buttonIcon}
            {buttonText}
        </button>
    </div>
);

export default Pod;
