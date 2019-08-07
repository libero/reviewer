import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import routerWrapper from '../../../test-utils/routerWrapper';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';

const renderDropDown = (): RenderResult =>
    render(<ProfileDropdown name="Name" />, {
        wrapper: routerWrapper(['/']),
    });

describe('ProfileDropDown', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(renderDropDown).not.toThrow();
    });

    it('should not show profile menu on mount', (): void => {
        const { container } = renderDropDown();
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
    });

    it('should have aria-haspopup and aria-expanded tags on button', (): void => {
        const { container } = renderDropDown();
        expect(container.querySelector('.profile_dropdown__button')).toHaveAttribute('aria-haspopup');
        expect(container.querySelector('.profile_dropdown__button')).toHaveAttribute('aria-expanded');
    });

    it('should mark aria-expanded to false when profile menu not shown', (): void => {
        const { container } = renderDropDown();
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
        expect(container.querySelector('.profile_dropdown__button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows profile menu on click of button', (): void => {
        const { container } = renderDropDown();
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
        fireEvent.click(container.querySelector('.profile_dropdown__button'));
        expect(container.querySelector('.profile_dropdown__panel')).toBeInTheDocument();
    });

    it('closes profile menu on second click of button', (): void => {
        const { container } = renderDropDown();
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
        fireEvent.click(container.querySelector('.profile_dropdown__button'));
        expect(container.querySelector('.profile_dropdown__panel')).toBeInTheDocument();
        fireEvent.click(container.querySelector('.profile_dropdown__button'));
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
    });

    it('displays name in the profile menu', (): void => {
        const { getByText, container } = renderDropDown();
        fireEvent.click(container.querySelector('.profile_dropdown__button'));
        expect(getByText('Name')).toBeInTheDocument();
    });

    it('displays the ORCID and logout links in profile menu', (): void => {
        const { getByText, container } = renderDropDown();
        fireEvent.click(container.querySelector('.profile_dropdown__button'));
        expect(getByText('Manage ORCID')).toHaveAttribute('href', 'https://orcid.org/my-orcid');
        expect(getByText('Logout')).toHaveAttribute('href', '/logout');
    });

    it('closes when clicking off the menu', (): void => {
        const { container, getByText } = render(
            <div>
                <ProfileDropdown name="Name" />
                <span>test</span>
            </div>,
            {
                wrapper: routerWrapper(['/']),
            },
        );
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
        fireEvent.click(container.querySelector('.profile_dropdown__button'));
        expect(container.querySelector('.profile_dropdown__panel')).toBeInTheDocument();
        fireEvent.click(getByText('test'));
        expect(container.querySelector('.profile_dropdown__panel')).not.toBeInTheDocument();
    });
});
