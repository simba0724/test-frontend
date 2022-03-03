import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

import Chat from '../chat/Chat';

import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Chat} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
