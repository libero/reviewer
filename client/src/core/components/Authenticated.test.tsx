import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import combineWrappers from '../../../test-utils/combineWrappers';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import Authenticated from './Authenticated'

const makeWrapper = ({ children = '', token }: any): RenderResult => render(
    <MemoryRouter initialEntries={['/']}>
        <Route exact path="/" render={() => <Authenticated token={token}>{children}</Authenticated>} />
        <Route path="/login" render={() => 'Login'} />
    </MemoryRouter>
, { wrapper: combineWrappers(apolloWrapper()) });

describe('Authenticated', () => {
    afterEach(cleanup)

    it('renders empty if token is empty', (): void => {
        const token:any = null;
        const { container }: RenderResult = makeWrapper({ token });

        expect(container.textContent).toBe('');
    });

    it('renders children if auth token is not empty', (): void => {
        const token:string = 'token';
        const children:string = 'content';
        const { container }: RenderResult = makeWrapper({ children, token });

        expect(container.textContent).toBe('content');
    });
})
