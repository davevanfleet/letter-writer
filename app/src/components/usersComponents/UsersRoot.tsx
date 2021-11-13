import { Route, Switch, useRouteMatch } from 'react-router';
import NewPublisher from './NewPublisher';
import Publishers from './Publishers';
import React from 'react';
import useAuthorization from '../../hooks/useAuthorization';

const UsersRoot = (): JSX.Element => {
  useAuthorization('Admin');
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/new`} component={NewPublisher} />
      <Route component={Publishers} />
    </Switch>
  );
};

export default UsersRoot;
