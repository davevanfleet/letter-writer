import { Route, Switch, useRouteMatch } from 'react-router';
import DNCIndex from './DNCIndex';
import DNCs from './DNCs';
import React from 'react';
import SubNav from '../menuComponents/SubNav';
import useAuthorization from '../../hooks/useAuthorization';

const DNCRoot = (): JSX.Element => {
  useAuthorization('Admin');
  const match = useRouteMatch();
  return (
    <>
      <SubNav page="dnc" />
      <Switch>
        <Route path={`${match.path}/all`} component={DNCIndex} />
        <Route component={DNCs} />
      </Switch>
    </>
  );
};

export default DNCRoot;
