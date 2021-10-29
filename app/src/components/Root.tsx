import { Route, Switch } from 'react-router-dom';
import ConfirmNewUser from './usersComponents/ConfirmNewUser';
import DNCRoot from './dncComponents/DNCRoot';
import Home from './Home';
import LoginForm from './LoginForm';
import React from 'react';
import Register from './registerComponents/Register';
import TerritoryRoot from './territoryComponents/TerritoryRoot';
import UploaderRoot from './uploadsComponents/UploaderRoot';
import UsersRoot from './usersComponents/UsersRoot';
import { config } from '../constants';
import { useUserContext } from '../contexts/UserContext';

const Root = () => {
  const { currentUser, login } = useUserContext();

  return currentUser ? (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/territories" component={TerritoryRoot} />
      <Route path="/dncs" component={DNCRoot} />
      <Route path="/upload" component={UploaderRoot} />
      <Route path="/users" component={UsersRoot} />
      <Route component={Home} />
    </Switch>
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
