import { Route, Switch, useRouteMatch } from 'react-router';
import NewTerritory from './NewTerritory';
import React from 'react';
import RecordBookShow from './RecordBookShow';
import Territories from './Territories';

const TerritoryRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/new`} component={NewTerritory} />
      <Route path={`${match.path}/records`} component={RecordBookShow} />
      <Route component={Territories} />
    </Switch>
  );
};

export default TerritoryRoot;
