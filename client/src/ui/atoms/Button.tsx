import React from 'react';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    type?: string;
    children?: string;
}

const Button: React.FC<Props> = ({ type, children, className, ...rest }: Props): JSX.Element => (
    <button className={`button ${type ? 'button--' + type : ''} ${className}`} {...rest}>
        {children}
    </button>
);

export default Button;
