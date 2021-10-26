import { Route, Switch, useRouteMatch } from 'react-router';
import DNCIndex from './DNCIndex';
import DNCs from './DNCs';
import React from 'react';

const DNCRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/all`} component={DNCIndex} />
      <Route component={DNCs} />
    </Switch>
  );
};

export default DNCRoot;
