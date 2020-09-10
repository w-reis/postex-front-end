import React from 'react';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import DefaultLayout from '../pages/layouts/default';
import AuthLayout from '../pages/layouts/auth';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  if (!user && isPrivate) {
    return <Redirect to="/" />;
  }

  if (user && !isPrivate) {
    return <Redirect to="/correspondences" />;
  }

  const Layout = user ? DefaultLayout : AuthLayout;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/correspondences',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
