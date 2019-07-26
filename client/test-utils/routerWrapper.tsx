import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';

interface memoryRouterProps {
    children: ReactNode;
}

export default (historyLocation: LocationDescriptor[] = ['/']) => {
    const render: React.FC<memoryRouterProps> = ({ children }): JSX.Element => (
        <MemoryRouter initialEntries={historyLocation}>{children}</MemoryRouter>
    );
    return render;
};
