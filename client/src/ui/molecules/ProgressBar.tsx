import React, { Fragment } from 'react';
import Check from '@material-ui/icons/Check';

type StepState = 'activated' | 'current' | null;

interface Step {
    id: string;
    label?: string;
}
interface Props {
    steps?: Step[];
    currentStep?: string;
    fixedWidthCentered?: boolean 
}

const ProgressBar: React.FC<Props> = ({ steps = [], currentStep, fixedWidthCentered }: Props): JSX.Element => {
    const currentStepIndex: number = currentStep
        ? steps.findIndex((step: Step): boolean => step.id === currentStep)
        : 0;
    const getStepState = (step: Step, index: number): StepState => {
        if (index === currentStepIndex) {
            return 'current';
        }
        if (index <= currentStepIndex) {
            return 'activated';
        }

        return null;
    };
    return (
        <div className={`progress_bar ${fixedWidthCentered ? 'progress_bar--fixed_width_centered' : ''}`}>
            {steps.map(
                (step: Step, index: number): JSX.Element => (
                    <ProgressStep key={step.id} {...step} state={getStepState(step, index)} firstItem={index === 0} />
                ),
            )}
        </div>
    );
};

type ProgressStepProps = Step & {
    state?: StepState;
    firstItem?: boolean;
};

const ProgressStep: React.FC<ProgressStepProps> = ({ label, firstItem, state }: ProgressStepProps): JSX.Element => (
    <Fragment>
        {!firstItem && <div className={`progress_bar__divider ${state ? 'progress_bar__divider--' + state : ''}`} />}
        <div className={`progress_bar__step ${state ? 'progress_bar__step--' + state : ''}`}>
            <span className={`progress_bar__bullet ${state ? 'progress_bar__bullet--' + state : ''}`}>
                {state === 'activated' && <Check className="progress_bar__icon" />}
            </span>
            <span className={`progress_bar__text ${state ? 'progress_bar__text--' + state : ''}`}>{label}</span>
        </div>
    </Fragment>
);

export default ProgressBar;
