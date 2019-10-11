import React from 'react';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    type?: string;
    children?: string;
    disabled?: boolean;
}

const Button: React.FC<Props> = ({ type, children, className, disabled = false, ...rest }: Props): JSX.Element => (
    <button
        className={`button${type ? ' button--' + type : ''}${className ? ' ' + className : ''}`}
        disabled={disabled}
        {...rest}
    >
        {children}
    </button>
);

export default Button;
