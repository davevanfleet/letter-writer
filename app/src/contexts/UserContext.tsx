import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IUser } from '../shared/interfaces';
import { config } from '../constants';
interface IUserProviderProps {
  children: JSX.Element;
}

interface IUserProviderValues {
  currentUser?: IUser;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>;
  login: (e: any) => void;
  logout: (e: any) => void;
}

interface ICredentials {
  username: string;
  password: string;
}

const UserContext = createContext({} as IUserProviderValues);

const UserProvider = ({ children }: IUserProviderProps): JSX.Element => {
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

  const login = ({ username, password }: ICredentials) => {
    const credentials = {
      username,
      password,
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
        setCurrentUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): IUserProviderValues => useContext(UserContext);

export { UserProvider, useUserContext };
