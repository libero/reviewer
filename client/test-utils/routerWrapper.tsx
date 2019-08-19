import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history'

export default (historyLocation: LocationDescriptor[] = ['/']) => {
    const render: React.FC<{}> = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <MemoryRouter initialEntries={historyLocation}>
            {children}
        </MemoryRouter>
    );
    return render;
}

