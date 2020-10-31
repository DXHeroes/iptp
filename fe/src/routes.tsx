import React from 'react';
import { Router, Redirect } from '@reach/router';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateFlow from './pages/CreateFlow';
import Transaction from './pages/Transaction';

type RouterProps = {
  component: React.FC;
  path: string;
  allowed: boolean;
  location?: any;
};

const ProtectedRoute: React.FC<RouterProps> = ({
  component: Component,
  allowed,
  ...props
}) => {
  if (allowed) {
    return <Component {...props} />;
  } else {
    // // if your visiting a party site from an invitation and your not logged in, save a redirect url to localstorage
    // if (props.path === '/party') {
    //   localStorage.removeItem('redirect_url');
    //   localStorage.setItem('redirect_url', `/party${props.location.search}`);
    // }
    return <Redirect to="/" noThrow />;
  }
};

const PublicRoute: React.FC<RouterProps> = ({
  component: Component,
  allowed,
  ...props
}) => {
  if (allowed) {
    return <Component {...props} />;
  } else {
    // if (props.path === '/auth') {
    //   // redirect to saved redirect_url after login
    //   const redirectUrl = localStorage.getItem('redirect_url');
    //   localStorage.removeItem('redirect_url');
    //   return <Redirect to={redirectUrl ? redirectUrl : '/rooms'} noThrow />;
    // }
    return <Redirect to="/dashboard" noThrow />;
  }
};

interface Props {
  logged: boolean;
}

export const Routes: React.FC<Props> = (props) => {
  const { logged } = props;

  return (
    <Router>
      <PublicRoute path="/" allowed={!logged} component={Home} />
      <ProtectedRoute
        path="/dashboard"
        allowed={!logged}
        component={Dashboard}
      />
      <ProtectedRoute path="/flow" allowed={!logged} component={CreateFlow} />
      <ProtectedRoute
        path="/create/flow"
        allowed={!logged}
        component={CreateFlow}
      />
      <ProtectedRoute
        path="/transaction"
        allowed={!logged}
        component={Transaction}
      />
    </Router>
  );
};
