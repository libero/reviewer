import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';
import { Button } from '../../ui/atoms';
import { ProgressBar } from '../../ui/molecules';

interface Props {
    id: string;
}

interface StepConfig {
    id: string;
    label: string;
    component: () => JSX.Element;
}
/*eslint-disable react/display-name*/
const stepConfig: StepConfig[] = [
    { id: 'author', label: 'Author', component: (): JSX.Element => <div>Author Step</div> },
    { id: 'files', label: 'Files', component: (): JSX.Element => <div>File Step</div> },
    { id: 'details', label: 'Details', component: (): JSX.Element => <div>Detail Step</div> },
    { id: 'editors', label: 'Editors', component: (): JSX.Element => <div>Editors Step</div> },
    { id: 'disclosure', label: 'Disclosure', component: (): JSX.Element => <div>Disclosure Step</div> },
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({
    match,
    history,
}: RouteComponentProps<Props>): JSX.Element => {
    const getCurrentStepPath = (): string =>
        history.location.pathname.split('/')[3] && history.location.pathname.split('/')[3].toLowerCase();
    const getCurrentStepPathIndex = (): number =>
        stepConfig.findIndex((config): boolean => config.id === getCurrentStepPath());
    return (
        <Formik initialValues={{}} onSubmit={(): void => {}}>
            <React.Fragment>
                <ProgressBar
                    fixedWidthCentered
                    steps={stepConfig.map((step: StepConfig): { id: string; label: string } => ({
                        id: step.id,
                        label: step.label,
                    }))}
                    currentStep={getCurrentStepPath()}
                />
                <Switch>
                    {stepConfig.map(
                        (config): JSX.Element => (
                            <Route key={config.id} path={match.url + '/' + config.id} component={config.component} />
                        ),
                    )}
                    <Redirect from="/submit/:id" to={`/submit/${match.params.id}/author`} />
                </Switch>
                {getCurrentStepPathIndex() > 0 && (
                    <Button
                        onClick={(): void => {
                            history.push(`/submit/${match.params.id}/${stepConfig[getCurrentStepPathIndex() - 1].id}`);
                        }}
                    >
                        back
                    </Button>
                )}
                {getCurrentStepPathIndex() < stepConfig.length - 1 && (
                    <Button
                        onClick={(): void => {
                            history.push(`/submit/${match.params.id}/${stepConfig[getCurrentStepPathIndex() + 1].id}`);
                        }}
                        type="primary"
                    >
                        next
                    </Button>
                )}
            </React.Fragment>
        </Formik>
    );
};
export default SubmissionWizard;
