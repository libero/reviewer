import React, { ReactNode } from 'react';
interface AppBarProps {
    children?: ReactNode;
}
const AppBar: React.FC<AppBarProps> = ({ children }: AppBarProps): JSX.Element => (
    <div className="app-bar">{children}</div>
);

export default AppBar;
