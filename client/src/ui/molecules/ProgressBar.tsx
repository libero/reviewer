import React, { Fragment } from 'react';
import Check from '@material-ui/icons/Check';

type StepState = 'activated' | 'current' | null;

type Step = {
  id: string;
  text?: string;
  active?: boolean;
}
interface Props {
  steps?: Step[];
  currentStep?: string;
}

const ProgressBar: React.FC<Props> = ({ steps = [], currentStep }: Props): JSX.Element => {
  const currentStepIndex = currentStep ? steps.findIndex(step => step.id === currentStep) : 0;
  const getStepState = (step: Step, index: number): StepState => {
    if (index === currentStepIndex) {
      return 'current';
    }
    if (step.active || index <= currentStepIndex) {
      return 'activated';
    }

    return null;
  }
  return (
    <div className="progress_bar">
      {
        steps.map((step, index) => <ProgressStep 
          key={step.id} {...step}
          state={getStepState(step, index)}
          firstItem={index === 0}
        />)
      }
    </div>
  )
};

type ProgressStepProps = Step & {
  state?: StepState;
  firstItem?: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ text, firstItem, state }: ProgressStepProps): JSX.Element => (
  <Fragment>
    {
      !firstItem && <div className={`progress_bar__divider ${ state ? 'progress_bar__divider--' + state : ''}`}/>
    }
    <div className={`progress_bar__step ${ state ? 'progress_bar__step--' + state : ''}`}>
      <span className={`progress_bar__bullet ${state ? 'progress_bar__bullet--' + state : ''}`}>
        { state === 'activated' && <Check className="progress_bar__icon"/> }
      </span>
      <span className={`progress_bar__text ${state ? 'progress_bar__text--' + state : ''}`}>{ text }</span>
    </div>
  </Fragment>
)

export default ProgressBar;