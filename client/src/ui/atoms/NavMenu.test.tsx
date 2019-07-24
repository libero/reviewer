import React from 'react';
import NavMenu, { NavMenuItemType } from './NavMenu';
import routerWrapper from '../../../test-utils/routerWrapper'
import { cleanup, render, RenderResult, fireEvent} from '@testing-library/react';

const items: NavMenuItemType[] = [
    {
        display: 'Link 1',
        url: '/link-1'
    },
    {
        display: 'Link 2',
        url: '/link-2'
    },
    {
        display: 'google',
        url: 'www.google.com',
        external: true,
    },
]

describe('NavMenu', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<NavMenu />)).not.toThrow();
    });

    it('should render correct items', (): void => {
        const { container } = render(<NavMenu items={items} />, {
            wrapper: routerWrapper(['/']),
          })
        expect(container.querySelector('.nav-menu__item:first-child .nav-menu__link')).toHaveAttribute('href', '/link-1');
        expect(container.querySelector('.nav-menu__item:nth-child(3) .nav-menu__link')).toHaveAttribute('href', 'www.google.com');
        expect(container.querySelector('.nav-menu__item:first-child .nav-menu__link')).toHaveTextContent('Link 1');
        expect(container.querySelector('.nav-menu__item:nth-child(3) .nav-menu__link')).toHaveTextContent('google');
    });

    it('navigation link becomes active after click', (): void => {
        const { getByText } = render(<NavMenu items={items} />, {
            wrapper: routerWrapper(['/link-1']),
          })

        expect(getByText('Link 1')).toHaveClass('nav-menu__link--active')
        expect(getByText('Link 2')).not.toHaveClass('nav-menu__link--active')
        fireEvent.click(getByText('Link 2'))
        expect(getByText('Link 1')).not.toHaveClass('nav-menu__link--active')
        expect(getByText('Link 2')).toHaveClass('nav-menu__link--active')
    })
    it('displays not links as active if not on a path directed to by links', (): void => {
        const { container } = render(<NavMenu items={items} />, {
            wrapper: routerWrapper(['/']),
          })
          expect(container.querySelector('.nav-menu__link--active')).toBeNull()
    })
});
