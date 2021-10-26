import { Route, Switch, useRouteMatch } from 'react-router';
import DNCUpload from './DNCUpload';
import React from 'react';

const UploaderRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/dncs`} component={DNCUpload} />
    </Switch>
  );
};

export default UploaderRoot;