import './App.css';
import React, { useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { IUser } from './shared/interfaces';
import Layout from './components/Layout';
import Root from './components/Root';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const [flash, setFlash] = useState('');

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
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Layout logout={logout} flash={flash}>
            <Root />
          </Layout>
        </Router>
      </UserProvider>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  libraries: ['geometry'],
})(App);
