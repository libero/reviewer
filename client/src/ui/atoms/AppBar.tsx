import React, { ReactNode } from 'react';
interface Props {
    children?: ReactNode;
}
const AppBar: React.FC<Props> = ({ children }: Props): JSX.Element => <div className="app-bar">{children}</div>;

export default AppBar;
