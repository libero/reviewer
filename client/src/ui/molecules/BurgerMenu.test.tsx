import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import BurgerMenu from './BurgerMenu';
import { MenuItemType } from './Menu';

const renderBurgerMenu = (items?: MenuItemType[]): RenderResult =>
    render(<BurgerMenu items={items} />, {
        wrapper: routerWrapper(['/']),
    });

describe('NavMenu', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<BurgerMenu />)).not.toThrow();
    });
    it('should not show menu on mount', (): void => {
        const { container } = renderBurgerMenu();
        expect(container.querySelector('.burger_menu__overlay')).not.toBeInTheDocument();
    });
    it('should have aria-haspopup on burger menu button', (): void => {
        const { container } = renderBurgerMenu();
        expect(container.querySelector('.burger_menu__icon_button--expand')).toHaveAttribute('aria-haspopup');
    });
    it('shows layover when burger button pressed', (): void => {
        const { container } = renderBurgerMenu();
        expect(container.querySelector('.burger_menu__overlay')).not.toBeInTheDocument();
        fireEvent.click(container.querySelector('.burger_menu__icon_button--expand'));
        expect(container.querySelector('.burger_menu__overlay')).toBeInTheDocument();
    });
    it('collapses when close button pressed', (): void => {
        const { container } = renderBurgerMenu();
        fireEvent.click(container.querySelector('.burger_menu__icon_button--expand'));
        expect(container.querySelector('.burger_menu__overlay')).toBeInTheDocument();
        fireEvent.click(container.querySelector('.burger_menu__icon_button--collapse'));
        expect(container.querySelector('.burger_menu__overlay')).not.toBeInTheDocument();
    });
    it('displays the menu items passed', (): void => {
        const { container, getByText } = renderBurgerMenu([
            { url: '/link', display: 'Link' },
            { url: '/link2', display: 'Link2' },
        ]);
        fireEvent.click(container.querySelector('.burger_menu__icon_button--expand'));
        expect(getByText('Link')).toBeInTheDocument();
        expect(getByText('Link2')).toBeInTheDocument();
    });
    it('collapses when a reletive menu link is clicked', (): void => {
        const { container, getByText } = renderBurgerMenu([{ url: '/link', display: 'Link' }]);
        fireEvent.click(container.querySelector('.burger_menu__icon_button--expand'));
        expect(container.querySelector('.burger_menu__overlay')).toBeInTheDocument();
        fireEvent.click(getByText('Link'));
        expect(container.querySelector('.burger_menu__overlay')).not.toBeInTheDocument();
    });
});
