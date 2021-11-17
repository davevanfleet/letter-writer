import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAssignment, IUser } from '../shared/interfaces';
import { config } from '../constants';
import { useUserContext } from './UserContext';

interface IPublishersProviderProps {
  children: JSX.Element[];
}

interface IPublishersProviderValues {
  publishers: IUser[];
}

const PublishersContext = createContext({} as IPublishersProviderValues);

const PublishersProvider = ({ children }: IPublishersProviderProps): JSX.Element => {
  const { currentUser } = useUserContext();
  const [publishers, setPublishers] = useState<IUser[]>([]);

  useEffect(() => {
    if (currentUser) {
      fetch(`${config.url.API_URL}/congregations/${currentUser.congregation.id}/users`)
        .then((r) => r.json())
        .then((json) => {
          setPublishers(json);
        });
    }
  }, [currentUser]);

  return (
    <PublishersContext.Provider
      value={{
        publishers,
      }}
    >
      {children}
    </PublishersContext.Provider>
  );
};

const usePublishersContext = (): IPublishersProviderValues => useContext(PublishersContext);

export { PublishersProvider, usePublishersContext };
