import React from 'react';
import { Router, Redirect } from '@reach/router';
import Home from './pages/Home';
import Consent from './pages/Consent';
import Dashboard from './pages/Dashboard';
import CreateFlow from './pages/CreateFlow';
import Transaction from './pages/Transaction';
import AuthRedirect from './pages/AuthRedirect';

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
      <PublicRoute path="/consent" allowed={!logged} component={Consent} />
      <PublicRoute path="/auth" allowed={!logged} component={AuthRedirect} />
      <ProtectedRoute
        path="/dashboard"
        allowed={logged}
        component={Dashboard}
      />
      <ProtectedRoute path="/flow" allowed={logged} component={CreateFlow} />
      <ProtectedRoute
        path="/create/flow"
        allowed={logged}
        component={CreateFlow}
      />
      <ProtectedRoute
        path="/transaction"
        allowed={logged}
        component={Transaction}
      />
    </Router>
  );
};
