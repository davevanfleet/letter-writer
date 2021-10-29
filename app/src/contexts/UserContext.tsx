import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IUser } from '../shared/interfaces';
import { config } from '../constants';
interface UserProviderProps {
  children: JSX.Element;
}

interface UserProviderValues {
  currentUser?: IUser;
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

  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserProviderValues => useContext(UserContext);

export { UserProvider, useUserContext };
