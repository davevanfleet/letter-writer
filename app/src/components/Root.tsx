import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import ConfirmNewUser from './usersComponents/ConfirmNewUser';
import Home from './Home';
import LoginForm from './LoginForm';
import Register from './registerComponents/Register';
import { useUserContext } from '../contexts/UserContext';

const TerritoryRoot = lazy(() => import('./territoryComponents/TerritoryRoot'));
const DNCRoot = lazy(() => import('./dncComponents/DNCRoot'));
const UploaderRoot = lazy(() => import('./uploadsComponents/UploaderRoot'));
const UsersRoot = lazy(() => import('./usersComponents/UsersRoot'));
const AssignmentsRoot = lazy(() => import('./assignmentsComponents/AssignmentsRoot'));

const Root = () => {
  const { currentUser } = useUserContext();
  return currentUser ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/territories" component={TerritoryRoot} />
        <Route path="/dncs" component={DNCRoot} />
        <Route path="/upload" component={UploaderRoot} />
        <Route path="/users" component={UsersRoot} />
        <Route path="/assignments" component={AssignmentsRoot} />
        <Route component={Home} />
      </Switch>
    </Suspense>
  ) : (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={Register} />
      <Route path="/confirm/:token" component={ConfirmNewUser} />
      <Route component={LoginForm} />
    </Switch>
  );
};

export default Root;
