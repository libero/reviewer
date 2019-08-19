import React, { PropsWithChildren, ReactElement } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';

export default ( mocks?: MockedResponse[], addTypename: boolean = false ) => {
    const render: React.FC<{}> = ({ children }: PropsWithChildren<{}>): JSX.Element => (
        <MockedProvider mocks={mocks} addTypename={addTypename}>
            {children as ReactElement}
        </MockedProvider>
    );
    return render;
}

