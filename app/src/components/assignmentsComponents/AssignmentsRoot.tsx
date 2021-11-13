import { Route, Switch, useRouteMatch } from 'react-router';
import React from 'react';
import Assignments from './Assignments';
import { AssignmentsProvider } from '../../contexts/AssignmentsContext';

const AssignmentsRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <AssignmentsProvider>
      <Switch>
        <Route component={Assignments} />
      </Switch>
    </AssignmentsProvider>
  );
};

export default AssignmentsRoot;
