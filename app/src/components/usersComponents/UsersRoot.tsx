import { Route, Switch, useRouteMatch } from 'react-router';
import NewPublisher from './NewPublisher';
import Publishers from './Publishers';
import React from 'react';

const UsersRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/new`} component={NewPublisher} />
      <Route component={Publishers} />
    </Switch>
  );
};

export default UsersRoot;
