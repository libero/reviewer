import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { Formik } from 'formik';
import { Button } from '../../ui/atoms';

interface Props {
    id: string;
}

const stepRoutes: RouteProps[] = [
    { path: '/author', component: () => <div>Author Step</div> },
    { path: '/files', component: () => <div>File Step</div> },
    { path: '/details', component: () => <div>Detail Step</div> },
    { path: '/editors', component: () => <div>Editors Step</div> },
    { path: '/disclosure', component: () => <div>Disclosure Step</div> }
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({ match, history }: RouteComponentProps<Props>): JSX.Element => {
    const getCurrentStepPath = (): string => history.location.pathname.split('/')[3] && history.location.pathname.split('/')[3].toLowerCase();
    const getCurrentStepPathIndex = (): number => stepRoutes.findIndex(config => config.path === '/' + getCurrentStepPath());
    return (
        <Formik initialValues={{}} onSubmit={(): void => { }}>
            <React.Fragment>
                <Switch>
                    {stepRoutes.map((route) => (
                        <Route
                            key={route.path as string}
                            path={match.url + route.path}
                            component={route.component}
                        />
                    ))}
                    <Redirect
                        from="/submit/:id"
                        to={`/submit/${match.params.id}/author`}
                    />
                </Switch>
                {
                    getCurrentStepPathIndex() > 0 && <Button onClick={() => {
                        history.push(`/submit/${match.params.id}${stepRoutes[getCurrentStepPathIndex() - 1].path}`);
                    }}>back</Button>
                }
                {
                    getCurrentStepPathIndex() < stepRoutes.length - 1 && <Button onClick={() => {
                            history.push(`/submit/${match.params.id}${stepRoutes[getCurrentStepPathIndex() + 1].path}`);
                    }} primary>next</Button>
                }
            </React.Fragment>
        </Formik>
    );
};
export default SubmissionWizard;
