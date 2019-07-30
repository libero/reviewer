import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import routerWrapper from '../../../test-utils/routerWrapper';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';

const renderDropDown = (): RenderResult => render(<ProfileDropdown name="Name" />, {
  wrapper: routerWrapper(['/']),
});

describe('ProfileDropDown', (): void => {
  afterEach(cleanup);

  it('should render correctly', (): void => {
      expect(renderDropDown).not.toThrow();
  });

  it('should not show profile menu on mount', (): void => {
    const { container } = renderDropDown();
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument()
  })
  it('should have have aria-haspopup and aria-expanded tags on button', (): void => {
    const { container } = renderDropDown();
    expect(container.querySelector('.profile-dropdown__button')).toHaveAttribute('aria-haspopup');
    expect(container.querySelector('.profile-dropdown__button')).toHaveAttribute('aria-expanded');
  })
  it('should mark aria-expanded to false when profile menu not shown', (): void => {
    const { container } = renderDropDown();
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument()
    expect(container.querySelector('.profile-dropdown__button')).toHaveAttribute('aria-expanded', 'false');
  })
  it('shows profile menu on click of button', (): void => {
    const { container } = renderDropDown();
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument()
    fireEvent.click(container.querySelector('.profile-dropdown__button')); 
    expect(container.querySelector('.profile-dropdown__panel')).toBeInTheDocument()
  })
});