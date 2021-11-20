import { Route, Switch, useRouteMatch } from 'react-router';
import NewPublisher from './NewPublisher';
import Publishers from './Publishers';
import React from 'react';
import useAuthorization from '../../hooks/useAuthorization';
import Publisher from './Publisher';

const UsersRoot = (): JSX.Element => {
  useAuthorization('Admin');
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/new`} component={NewPublisher} />
      <Route path={`${match.path}/:id`} component={Publisher} />
      <Route component={Publishers} />
    </Switch>
  );
};

export default UsersRoot;
