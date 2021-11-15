import { Route, Switch, useRouteMatch } from 'react-router';
import NewTerritory from './NewTerritory';
import React from 'react';
import RecordBookShow from './RecordBookShow';
import SubNav from '../menuComponents/SubNav';
import Territories from './Territories';
import Territory from './Territory';

const TerritoryRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <>
      <SubNav page="territory" />
      <Switch>
        <Route path={`${match.path}/new`} component={NewTerritory} />
        <Route path={`${match.path}/records`} component={RecordBookShow} />
        <Route component={Territories} />
      </Switch>
    </>
  );
};

export default TerritoryRoot;
