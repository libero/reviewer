import React, { ReactNode } from 'react';
import NavMenu from './NavMenu';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history'

type memoryRouterProps = {
    children: ReactNode
}

const setupProvider = (historyLocation: LocationDescriptor[] = ['/']) => {
    const render: React.FC<memoryRouterProps> = ({ children }): JSX.Element => (
        <MemoryRouter initialEntries={historyLocation}>
            {children}
        </MemoryRouter>
    );
    return render;
}

describe('NavMenu', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<NavMenu />)).not.toThrow();
    });

    it('should render correct items', (): void => {
        const items = [
            {
                display: 'test1',
                url: '/'
            },
            {
                display: 'google',
                url: 'www.google.com',
                external: true,
            }
        ];

        const { container } = render(setupProvider(['/'])({ children: <NavMenu items={items} /> }));
        expect(container.querySelector('.nav-menu__item:first-child .nav-menu__link')).toHaveAttribute('href', '/');
        expect(container.querySelector('.nav-menu__item:nth-child(2) .nav-menu__link')).toHaveAttribute('href', 'www.google.com');
        expect(container.querySelector('.nav-menu__item:first-child .nav-menu__link')).toHaveTextContent('test1');
        expect(container.querySelector('.nav-menu__item:nth-child(2) .nav-menu__link')).toHaveTextContent('google');
    });
});
