import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ConfirmNewUser from './components/usersComponents/ConfirmNewUser';
import DNCRoot from './components/dncComponents/DNCRoot';
import { GoogleApiWrapper } from 'google-maps-react';
import Home from './components/Home';
import { IUser } from './shared/interfaces';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import Register from './components/registerComponents/Register';
import TerritoryRoot from './components/territoryComponents/TerritoryRoot';
import UploaderRoot from './components/uploadsComponents/UploaderRoot';
import UserContext from './contexts/UserContext';
import UsersRoot from './components/usersComponents/UsersRoot';
import axios from 'axios';
import { config } from './constants';
import useGetUserByToken from './hooks/useGetUserByToken';

const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      axios
        .get(`${config.url.API_URL}/get_current_user`, {
          headers: {
            Auth: token,
          },
        })
        .then((response) => {
          setCurrentUser(JSON.parse(response.data.user));
        })
        .catch((e) => {
          setCurrentUser(undefined);
        });
    }
  }, []);

  const [flash, setFlash] = useState('');

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

  const addFlash = (message: string) => {
    setFlash(message);
    setTimeout(() => {
      setFlash('');
    }, 5000);
  };

  return currentUser ? (
    <div className="App">
      <UserContext.Provider value={{ currentUser, login, logout }}>
        <Router>
          <Layout logout={logout} flash={flash}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/territories" component={TerritoryRoot} />
              <Route path="/dncs" component={DNCRoot} />
              <Route path="/upload" component={UploaderRoot} />
              <Route path="/users" component={UsersRoot} />
              <Route component={Home} />
            </Switch>
          </Layout>
        </Router>
      </UserContext.Provider>
    </div>
  ) : (
    <div className="App">
      <Router>
        <Layout logout={logout} flash={flash}>
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
        </Layout>
      </Router>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  libraries: ['geometry'],
})(App);
