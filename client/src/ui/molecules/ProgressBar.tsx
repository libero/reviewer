import React, { Fragment } from 'react';
import Check from '@material-ui/icons/Check';

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
  return (
    <div className="progress_bar">
      {
        steps.map((step, index) => <ProgressStep 
          key={step.id} {...step}
          current={index === currentStepIndex}
          activated={step.active || index <= currentStepIndex}
          firstItem={index === 0}
        />)
      }
    </div>
  )
};

type ProgressStepProps = Step & {
  current?: boolean;
  activated?: boolean;
  firstItem?: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ text, firstItem, activated, current }: ProgressStepProps): JSX.Element => (
  <Fragment>
    { 
      !firstItem && <div className={`progress_bar__divider ${ activated ? 'progress_bar__divider--activated' : ''}`}/>
    }
    <div className={`progress_bar__step ${ current ? 'progress_bar__step--current' : ''} ${ activated ? 'progress_bar__step--activated' : ''}`}>
      <span className={`progress_bar__bullet ${current ? 'progress_bar__bullet--current' : ''} ${activated && !current ? 'progress_bar__bullet--activated' : ''}`}>
        { activated && !current && <Check className="progress_bar__icon"/> }
      </span>
      <span className={`progress_bar__text ${activated ? 'progress_bar__text--activated' : ''}`}>{ text }</span>
    </div>
  </Fragment>
)

export default ProgressBar;