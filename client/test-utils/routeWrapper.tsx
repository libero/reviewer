import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export type RouteWrapper = {
  component: JSX.Element;
  getProps: () => RouteComponentProps;
}

const routeWrapper = (Component: React.ComponentType<RouteComponentProps>, routeProps?: RouteProps, componentProps?: object): RouteWrapper => {
  let innerProps: RouteComponentProps;
  const component = <Route {...{...routeProps, ...componentProps}} component={(props: RouteComponentProps) => { 
    innerProps = props;
    return <Component {...props}/>
  }} /> 
  return { 
    component,
    getProps: () => innerProps
  }
}

export default routeWrapper;