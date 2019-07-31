import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import BurgerMenu from './BurgerMenu';
import { MenuItemType } from './Menu'

const renderBurgerMenu = (items?: MenuItemType[]): RenderResult => render(<BurgerMenu items={items} />, {
  wrapper: routerWrapper(['/']),
});

describe('NavMenu', (): void => {
  afterEach(cleanup);

  it('should render correctly', (): void => {
      expect((): RenderResult => render(<BurgerMenu />)).not.toThrow();
  });
  it('should not show menu on mount', (): void => {
    const { container } = renderBurgerMenu();
    expect(container.querySelector('.burger_menu__overlay')).not.toBeInTheDocument()
  })
  it('should have aria-haspopup on burger menu button', (): void => {
    const { container } = renderBurgerMenu();
    expect(container.querySelector('.burger_menu__icon_button--expand')).toHaveAttribute('aria-haspopup')
  })
  it.skip('shows layover when burger button pressed', (): void => {
   
  })
});