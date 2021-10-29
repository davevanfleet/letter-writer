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
  const { currentUser } = useUserContext();

  const login = (e: any) => {
    e.preventDefault();
    const credentials = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(credentials),
    };

    fetch(`${config.url.API_URL}/login`, configObj)
      .then((r) => r.json())
      .then((json) => {
        if (json.error) {
          throw json.error;
        }
        const user = JSON.parse(json.user);
        // setCurrentUser(user);
        localStorage.setItem('token', json.jwt);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    localStorage.clear();
    // setCurrentUser(undefined);
  };

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
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route path="/confirm/:token">
        <ConfirmNewUser />
      </Route>
      <Route>
        <LoginForm login={login} />
      </Route>
    </Switch>
  );
};

export default Root;
