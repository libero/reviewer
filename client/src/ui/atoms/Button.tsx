import React from 'react';
interface Props {
    onClick?: Function;
    type?: string;
    children?: string;
}
const Button: React.FC<Props> = ({ onClick, type, children }: Props): JSX.Element => (
    <button className={`button ${type ? 'button--' + type : ''}`} onClick={(): void => onClick()}>
        {children}
    </button>
);

export default Button;
