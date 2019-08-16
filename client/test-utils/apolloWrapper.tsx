import React, { ReactElement } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';

type Props = {
    children: ReactElement
}

export default ( mocks: MockedResponse[], addTypename: boolean = false ) => {
    const render: React.FC<Props> = ({ children }: Props): JSX.Element => (
        <MockedProvider mocks={mocks} addTypename={addTypename}>
            {children}
        </MockedProvider>
    );
    return render;
}

