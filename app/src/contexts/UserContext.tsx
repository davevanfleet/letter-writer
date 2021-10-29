import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IUser } from '../shared/interfaces';
import { config } from '../constants';
interface UserProviderProps {
  children: JSX.Element;
}

interface UserProviderValues {
  currentUser?: IUser;
  login: (e: any) => void;
  logout: (e: any) => void;
}

const UserContext = createContext({} as UserProviderValues);

const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();
  const loginAuthToken: string | null = localStorage.getItem('token');

  useEffect(() => {
    if (loginAuthToken) {
      fetch(`${config.url.API_URL}/get_current_user`, {
        headers: {
          Auth: loginAuthToken,
        },
      })
        .then((r) => r.json())
        .then((json) => {
          const user = JSON.parse(json.user);
          setCurrentUser(user);
        });
    }
  }, [loginAuthToken]);

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
        setCurrentUser(user);
        localStorage.setItem('token', json.jwt);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserProviderValues => useContext(UserContext);

export { UserProvider, useUserContext };
