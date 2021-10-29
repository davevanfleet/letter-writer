import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { config } from '../constants';
import { IUser } from '../shared/interfaces';

interface UserProviderProps {
  children: JSX.Element
}

interface UserProviderValues {
  currentUser: IUser
}

const UserContext = createContext({} as UserProviderValues);

const UserProvider = (
  { children }: UserProviderProps
): JSX.Element => {
  const [currentUser, setCurrentUser] = useState({} as IUser);
  const loginAuthToken: string | null = useMemo(() => localStorage.getItem('token') ?? null, []);

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
  }, [loginAuthToken])

  return (
    <UserContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserProviderValues => (
  useContext(UserContext)
);

export { UserProvider, useUserContext };
