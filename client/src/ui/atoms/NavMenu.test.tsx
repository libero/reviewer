import React, { ReactNode } from 'react';
import NavMenu, { NavMenuItemType } from './NavMenu';
import { cleanup, render, RenderResult, fireEvent} from '@testing-library/react';
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
        const items: NavMenuItemType[] = [
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
        const { container } = render(<NavMenu items={items} />, {
            wrapper: setupProvider(['/']),
          })
        expect(container.querySelector('.nav-menu__item:first-child .nav-menu__link')).toHaveAttribute('href', '/');
        expect(container.querySelector('.nav-menu__item:nth-child(2) .nav-menu__link')).toHaveAttribute('href', 'www.google.com');
        expect(container.querySelector('.nav-menu__item:first-child .nav-menu__link')).toHaveTextContent('test1');
        expect(container.querySelector('.nav-menu__item:nth-child(2) .nav-menu__link')).toHaveTextContent('google');
    });

    it('navigation link becomes active after click', (): void => {
        const items: NavMenuItemType[] = [
            {
                display: 'Link 1',
                url: '/link-1'
            },
            {
                display: 'Link 2',
                url: '/link-2'
            },
        ]
        const { getByText } = render(<NavMenu items={items} />, {
            wrapper: setupProvider(['/link-1']),
          })

        expect(getByText('Link 1')).toHaveClass('nav-menu__link--active')
        expect(getByText('Link 2')).not.toHaveClass('nav-menu__link--active')
        fireEvent.click(getByText('Link 2'))
        expect(getByText('Link 1')).not.toHaveClass('nav-menu__link--active')
        expect(getByText('Link 2')).toHaveClass('nav-menu__link--active')
    })
    it('displays not links as active if not on a path directed to by links', (): void => {
        const items: NavMenuItemType[] = [
            {
                display: 'Link 1',
                url: '/link-1'
            },
            {
                display: 'Link 2',
                url: '/link-2'
            },
        ]
        const { container } = render(<NavMenu items={items} />, {
            wrapper: setupProvider(['/']),
          })
          expect(container.querySelector('.nav-menu__link--active')).toBeNull()
    })
});
