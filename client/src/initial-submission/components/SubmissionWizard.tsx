import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { Formik } from 'formik';
import { Button } from '../../ui/atoms';

interface Props {
    id: string;
}

// This doesnt render route components to dom for some reason ???
const formPages: RouteProps[] = [
    { path: '/author', component: () => <div>Page 1</div> },
    { path: '/files', component: () => <div>Page 2</div> },
    { path: '/details', component: () => <div>Page 3</div> },
    { path: '/editors', component: () => <div>Page 4</div> },
    { path: '/disclosure', component: () => <div>Page 5</div> }
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({ match, history }: RouteComponentProps<Props>): JSX.Element => {
    const getCurrentStepPath = (): string => history.location.pathname.split('/')[3].toLowerCase();
    const getCurrentStepPathIndex = (): number => formPages.findIndex(config => config.path === '/' + getCurrentStepPath());

    return (
        <Formik initialValues={{}} onSubmit={(): void => {}}>
            <React.Fragment>
                <Switch>
                    {
                        formPages.map((route: RouteProps) => <Route key={route.path as string} {...route} />)
                    }
                    <Redirect
                        from="/submit/:id"
                        to={`/submit/${match.params.id}/author`}
                    />
                </Switch>
                <Button onClick={() =>{
                    if(getCurrentStepPathIndex() > 0) {
                        history.push(`/submit/${match.params.id}${formPages[getCurrentStepPathIndex() - 1].path}`);
                    } 
                }}>Prev</Button>
                <Button onClick={() =>{
                    if( getCurrentStepPathIndex() < formPages.length - 1) {
                        history.push(`/submit/${match.params.id}${formPages[getCurrentStepPathIndex() + 1].path}`);
                    } 
                }} primary>Next</Button>
            </React.Fragment>
        </Formik>
    );
};
export default SubmissionWizard;
