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
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument();
    expect(container.querySelector('.profile-dropdown__button')).toHaveAttribute('aria-expanded', 'false');
  })
  it('shows profile menu on click of button', (): void => {
    const { container } = renderDropDown();
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument();
    fireEvent.click(container.querySelector('.profile-dropdown__button')); 
    expect(container.querySelector('.profile-dropdown__panel')).toBeInTheDocument();
  })
  it('closes profile menu on second click of button', (): void => {
    const { container } = renderDropDown();
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument();
    fireEvent.click(container.querySelector('.profile-dropdown__button')); 
    expect(container.querySelector('.profile-dropdown__panel')).toBeInTheDocument();
    fireEvent.click(container.querySelector('.profile-dropdown__button')); 
    expect(container.querySelector('.profile-dropdown__panel')).not.toBeInTheDocument()
  })
  //TODO: How do we test the document event listeners for closing when clicking outside of component area?
  it('displays name in the profile menu', (): void => {
    const { getByText, container } = renderDropDown();
    fireEvent.click(container.querySelector('.profile-dropdown__button'));
    expect(getByText('Name')).toBeInTheDocument();
  })
  it('displays the ORCID and logout links in profile menu', () => {
    const { getByText, container } = renderDropDown();
    fireEvent.click(container.querySelector('.profile-dropdown__button'));
    expect(getByText('Manage ORCID')).toHaveAttribute('href', 'https://orcid.org/my-orcid');
    expect(getByText('Logout')).toHaveAttribute('href', '/logout');
  })
});