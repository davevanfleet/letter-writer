import { Route, Switch, useRouteMatch } from 'react-router';
import NewTerritory from './NewTerritory';
import React from 'react';
import RecordBookShow from './RecordBookShow';
import SubNav from '../menuComponents/SubNav';
import Territories from './Territories';
import { PublishersProvider } from '../../contexts/PublishersContext';

const TerritoryRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <PublishersProvider>
      <SubNav page="territory" />
      <Switch>
        <Route path={`${match.path}/new`} component={NewTerritory} />
        <Route path={`${match.path}/records`} component={RecordBookShow} />
        <Route component={Territories} />
      </Switch>
    </PublishersProvider>
  );
};

export default TerritoryRoot;
