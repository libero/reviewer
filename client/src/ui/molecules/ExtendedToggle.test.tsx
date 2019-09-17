import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import ExcludedToggle from './ExcludedToggle';

describe('ExcludedToggle', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" />),
        ).not.toThrow();
    });

    it('should display its prefix and action text together', (): void => {
        const { container } = render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" />);
        expect(container.querySelector('.excluded-toggle__label').textContent).toContain('Do an action');
    });

    it('should not display panel when closed', (): void => {
        const { container } = render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" />);
        expect(container.querySelector('.excluded-toggle__label')).toBeInTheDocument();
        expect(container.querySelector('.excluded-toggle__panel')).toBeNull();
    });

    it('should display the panel and not the toggle text when passed open', (): void => {
        const { container } = render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" open />);
        expect(container.querySelector('.excluded-toggle__label')).toBeNull();
        expect(container.querySelector('.excluded-toggle__panel')).toBeInTheDocument();
    });

    it('should display the panel and not the toggle text when the toggle text action button is clicked', async (): Promise<
        void
    > => {
        const { container } = render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" />);
        expect(container.querySelector('.excluded-toggle__panel')).toBeNull();
        await fireEvent.click(container.querySelector('.excluded-toggle__action'));
        expect(container.querySelector('.excluded-toggle__panel')).toBeInTheDocument();
        expect(container.querySelector('.excluded-toggle__label')).toBeNull();
    });

    it('should display a close icon in the toggled panel', (): void => {
        const { container } = render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" open />);
        expect(container.querySelector('.excluded-toggle__close-button')).toBeInTheDocument();
    });

    it('should should display the toggle text and not the panel if the close button is clicked', async (): Promise<
        void
    > => {
        const { container } = render(<ExcludedToggle togglePrefixText="Do an " toggleActionText="action" open />);
        expect(container.querySelector('.excluded-toggle__label')).toBeNull();
        await fireEvent.click(container.querySelector('.excluded-toggle__close-button'));
        expect(container.querySelector('.excluded-toggle__label')).toBeInTheDocument();
        expect(container.querySelector('.excluded-toggle__panel')).toBeNull();
    });

    it('passed panel heading should display in the heading block of the panel', (): void => {
        const { container } = render(
            <ExcludedToggle panelHeading="Some Heading" togglePrefixText="Do an " toggleActionText="action" open />,
        );
        expect(container.querySelector('.excluded-toggle__panel-heading')).toHaveTextContent('Some Heading');
    });

    it('should display children within panel', (): void => {
        const { container } = render(
            <ExcludedToggle panelHeading="Some Heading" togglePrefixText="Do an " toggleActionText="action" open>
                <span className="testSpan">Some test text</span>
            </ExcludedToggle>,
        );
        expect(container.querySelector('.testSpan')).toBeInTheDocument();
        expect(container.querySelector('.excluded-toggle__panel')).toHaveTextContent('Some test text');
    });
});
