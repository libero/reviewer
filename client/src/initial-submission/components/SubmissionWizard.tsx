import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { Formik } from 'formik';
import { Button } from '../../ui/atoms';
import { ProgressBar } from '../../ui/molecules';

interface Props {
    id: string;
}
/*eslint-disable react/display-name*/
const stepRoutes: RouteProps[] = [
    { path: '/author', component: (): JSX.Element => <div>Author Step</div> },
    { path: '/files', component: (): JSX.Element => <div>File Step</div> },
    { path: '/details', component: (): JSX.Element => <div>Detail Step</div> },
    { path: '/editors', component: (): JSX.Element => <div>Editors Step</div> },
    { path: '/disclosure', component: (): JSX.Element => <div>Disclosure Step</div> },
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({
    match,
    history,
}: RouteComponentProps<Props>): JSX.Element => {
    const getCurrentStepPath = (): string =>
        history.location.pathname.split('/')[3] && history.location.pathname.split('/')[3].toLowerCase();
    const getCurrentStepPathIndex = (): number =>
        stepRoutes.findIndex((config): boolean => config.path === '/' + getCurrentStepPath());
    return (
        <Formik initialValues={{}} onSubmit={(): void => {}}>
            <React.Fragment>
                <ProgressBar 
                    steps={[{ id: 'author', text: 'Author'}, { id: 'files', text: 'Files'}, { id: 'details', text: 'Details'}]}
                    currentStep={getCurrentStepPath()}
                />
                <Switch>
                    {stepRoutes.map(
                        (route): JSX.Element => (
                            <Route
                                key={route.path as string}
                                path={match.url + route.path}
                                component={route.component}
                            />
                        ),
                    )}
                    <Redirect from="/submit/:id" to={`/submit/${match.params.id}/author`} />
                </Switch>
                {getCurrentStepPathIndex() > 0 && (
                    <Button
                        onClick={(): void => {
                            history.push(`/submit/${match.params.id}${stepRoutes[getCurrentStepPathIndex() - 1].path}`);
                        }}
                    >
                        back
                    </Button>
                )}
                {getCurrentStepPathIndex() < stepRoutes.length - 1 && (
                    <Button
                        onClick={(): void => {
                            history.push(`/submit/${match.params.id}${stepRoutes[getCurrentStepPathIndex() + 1].path}`);
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
