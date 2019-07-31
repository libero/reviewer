import React from 'react';
import Menu, { MenuItemType } from './Menu';
import routerWrapper from '../../../test-utils/routerWrapper';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';

const items: MenuItemType[] = [
    {
        display: 'Link 1',
        url: '/link-1',
    },
    {
        display: 'Link 2',
        url: '/link-2',
    },
    {
        display: 'google',
        url: 'www.google.com',
        external: true,
    },
];

describe('NavMenu', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Menu />)).not.toThrow();
    });

    it('uses "menu" as a root className prefix if no rootClassName passed', (): void => {
        const { container } = render(<Menu items={items} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.menu__list')).toBeInTheDocument();
        expect(container.querySelector('.menu__item')).toBeInTheDocument();
        expect(container.querySelector('.menu__link')).toBeInTheDocument();
    })

    it('uses rootClassName passed as className prefix', (): void => {
        const { container } = render(<Menu items={items} rootClassName="foo"/>, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(container.querySelector('.menu__list')).not.toBeInTheDocument();
        expect(container.querySelector('.menu__item')).not.toBeInTheDocument();
        expect(container.querySelector('.menu__link')).not.toBeInTheDocument();
        expect(container.querySelector('.foo__list')).toBeInTheDocument();
        expect(container.querySelector('.foo__item')).toBeInTheDocument();
        expect(container.querySelector('.foo__link')).toBeInTheDocument();
    })

    it('should render correct items', (): void => {
        const { container } = render(<Menu items={items} />, {
            wrapper: routerWrapper(['/']),
        });
        expect(container.querySelector('.menu__item:first-child .menu__link')).toHaveAttribute(
            'href',
            '/link-1',
        );
        expect(container.querySelector('.menu__item:nth-child(3) .menu__link')).toHaveAttribute(
            'href',
            'www.google.com',
        );
        expect(container.querySelector('.menu__item:first-child .menu__link')).toHaveTextContent('Link 1');
        expect(container.querySelector('.menu__item:nth-child(3) .menu__link')).toHaveTextContent('google');
    });

    it('navigation link becomes active after click', (): void => {
        const { getByText } = render(<Menu items={items} />, {
            wrapper: routerWrapper(['/link-1']),
        });

        expect(getByText('Link 1')).toHaveClass('menu__link--active');
        expect(getByText('Link 2')).not.toHaveClass('menu__link--active');
        fireEvent.click(getByText('Link 2'));
        expect(getByText('Link 1')).not.toHaveClass('menu__link--active');
        expect(getByText('Link 2')).toHaveClass('menu__link--active');
    });
    it('displays not links as active if not on a path directed to by links', (): void => {
        const { container } = render(<Menu items={items} />, {
            wrapper: routerWrapper(['/']),
        });
        expect(container.querySelector('.menu__link--active')).toBeNull();
    });

    it('calls onLinkClick callback when non-external links are clicked', (): void => {
        const mockCallback = jest.fn();
        const { getByText } = render(<Menu 
            onLinkClick={mockCallback}
            items={[
            {
                display: 'Link 1',
                url: '/link-1',
            }
        ]} />, {
            wrapper: routerWrapper(['/']),
        });
        expect(mockCallback).toBeCalledTimes(0)
        fireEvent.click(getByText('Link 1'));
        expect(mockCallback).toBeCalledTimes(1)
    })
});
