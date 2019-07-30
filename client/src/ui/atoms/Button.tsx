import React from 'react';
interface Props {
    onClick?: Function;
    primary?: boolean;
    children: string;
}
const Button: React.FC<Props> = ({ onClick, primary, children }: Props): JSX.Element => <button className={primary ? "button button--primary" : "button"} onClick={() => onClick()}>{children}</button>;

export default Button;
