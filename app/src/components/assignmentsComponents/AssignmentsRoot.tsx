import { Route, Switch, useRouteMatch } from 'react-router';
import React from 'react';
import Assignments from './Assignments';
import { AssignmentsProvider } from '../../contexts/AssignmentsContext';
import Assignment from './Assignment';

const AssignmentsRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <AssignmentsProvider>
      <Switch>
        <Route path={`${match.path}/:id`} component={Assignment} />
        <Route component={Assignments} />
      </Switch>
    </AssignmentsProvider>
  );
};

export default AssignmentsRoot;
