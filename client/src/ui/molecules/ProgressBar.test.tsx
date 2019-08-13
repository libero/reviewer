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
        }
    ];

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<ProgressBar />)).not.toThrow();
    });

    it('should render a step for each steps config prop', ():void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} />);
        expect(container.querySelectorAll('.progress_bar__step')).toHaveLength(ProgressBarSteps.length);
    });

    it('should apply a fixed width class if passed fixedWidthCentered prop', ():void => {
        const { container, rerender } = render(<ProgressBar />);
        expect(container.querySelector('.progress_bar--fixed_width_centered')).not.toBeInTheDocument();
        rerender(<ProgressBar fixedWidthCentered/>);
        expect(container.querySelector('.progress_bar--fixed_width_centered')).toBeInTheDocument();

    });

    it('should render a label for each step', ():void => {
        const { getByText } = render(<ProgressBar steps={ProgressBarSteps} />);
        expect(getByText(ProgressBarSteps[0].label)).toBeInTheDocument();
        expect(getByText(ProgressBarSteps[1].label)).toBeInTheDocument();
        expect(getByText(ProgressBarSteps[2].label)).toBeInTheDocument();
        expect(getByText(ProgressBarSteps[3].label)).toBeInTheDocument();
    });

    it('should render steps in order given', ():void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} />);
        const steps = container.querySelectorAll('.progress_bar__step');
        expect(steps[0].textContent).toBe(ProgressBarSteps[0].label);
        expect(steps[1].textContent).toBe(ProgressBarSteps[1].label);
        expect(steps[2].textContent).toBe(ProgressBarSteps[2].label);
        expect(steps[3].textContent).toBe(ProgressBarSteps[3].label);
    });

    it('should give current step current class', ():void => {
        const { container } = render(<ProgressBar steps={ProgressBarSteps} currentStep={ProgressBarSteps[1].id}/>);
        const steps = container.querySelectorAll('.progress_bar__step');
        const currentSteps = container.querySelectorAll('.progress_bar__step--current');
        expect(currentSteps).toHaveLength(1);
        expect(steps[1]).toHaveClass('progress_bar__step--current');
    });
});
