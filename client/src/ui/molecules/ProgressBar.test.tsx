import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('Button', (): void => {
    afterEach(cleanup);

    const ProgressBarSteps = [
        {
            id: 'a',
            label: 'Label A',
        },
        {
            id: 'b',
            label: 'Label B',
        },
        {
            id: 'c',
            label: 'Label C',
        },
        {
            id: 'd',
            label: 'Label D',
        },
    ];

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<ProgressBar />)).not.toThrow();
    });

    it('should render a step for each steps config prop', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} />);
        expect(container.querySelectorAll('.progress_bar__step')).toHaveLength(ProgressBarSteps.length);
    });

    it('should apply a fixed width class if passed fixedWidthCentered prop', (): void => {
        const { container, rerender } = render(<ProgressBar />);
        expect(container.querySelector('.progress_bar--fixed_width_centered')).not.toBeInTheDocument();
        rerender(<ProgressBar fixedWidthCentered />);
        expect(container.querySelector('.progress_bar--fixed_width_centered')).toBeInTheDocument();
    });

    it('should render a label for each step', (): void => {
        const { getByText } = render(<ProgressBar steps={ProgressBarSteps} />);
        expect(getByText(ProgressBarSteps[0].label)).toBeInTheDocument();
        expect(getByText(ProgressBarSteps[1].label)).toBeInTheDocument();
        expect(getByText(ProgressBarSteps[2].label)).toBeInTheDocument();
        expect(getByText(ProgressBarSteps[3].label)).toBeInTheDocument();
    });

    it('should render steps in order given', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        expect(steps[0].textContent).toBe(ProgressBarSteps[0].label);
        expect(steps[1].textContent).toBe(ProgressBarSteps[1].label);
        expect(steps[2].textContent).toBe(ProgressBarSteps[2].label);
        expect(steps[3].textContent).toBe(ProgressBarSteps[3].label);
    });

    it('should give current step current class', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[1].id} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        const currentSteps = container.querySelectorAll('.progress_bar__step--current');
        expect(currentSteps).toHaveLength(1);
        expect(steps[1]).toHaveClass('progress_bar__step--current');
    });

    it('should give current divider current class', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[1].id} />);
        const dividers = container.querySelectorAll('.progress_bar__divider');
        const currentDividers = container.querySelectorAll('.progress_bar__divider--current');
        expect(currentDividers).toHaveLength(1);
        expect(dividers[0]).toHaveClass('progress_bar__divider--current');
    });

    it('should give all steps up until the current an activated class', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[2].id} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        expect(steps[0]).toHaveClass('progress_bar__step--activated');
        expect(steps[1]).toHaveClass('progress_bar__step--activated');
        expect(steps[2]).not.toHaveClass('progress_bar__step--activated');
        expect(steps[3]).not.toHaveClass('progress_bar__step--activated');
    });

    it('should give all dividers up until the current an activated class', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[2].id} />);
        const dividers = container.querySelectorAll('.progress_bar__divider');
        expect(dividers[0]).toHaveClass('progress_bar__divider--activated');
        expect(dividers[1]).not.toHaveClass('progress_bar__divider--activated');
        expect(dividers[2]).not.toHaveClass('progress_bar__divider--activated');
    });

    it('should not give any steps after the current step a state modifier class', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[2].id} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        expect(steps[3]).not.toHaveClass('progress_bar__step--activated');
        expect(steps[3]).not.toHaveClass('progress_bar__step--current');
    });

    it('should display a check icon for each activated steps', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[2].id} />);
        expect(container.querySelectorAll('.progress_bar__icon')).toHaveLength(2);
        const activatedSteps = container.querySelectorAll('.progress_bar__step--activated');
        activatedSteps.forEach((step: Element): void => {
            expect(step.querySelector('.progress_bar__icon')).toBeInTheDocument();
        });
    });

    it('displays a divider before each step element except the first step', (): void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[2].id} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        const dividers = container.querySelectorAll('.progress_bar__divider');
        expect(steps).toHaveLength(ProgressBarSteps.length);
        expect(dividers).toHaveLength(ProgressBarSteps.length - 1);
    });

    it('displays a step but no divider if it only has one step', (): void => {
        const { container } = render(<ProgressBar steps={[{ ...ProgressBarSteps[0] }]} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        const dividers = container.querySelectorAll('.progress_bar__divider');
        expect(steps).toHaveLength(1);
        expect(dividers).toHaveLength(0);
    });
});
