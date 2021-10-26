import { IUser } from '../shared/interfaces';
import React from 'react';

interface IUserContext {
  currentUser?: IUser;
  logout: () => void;
  login: (e: any) => void;
}

const UserContext = React.createContext<IUserContext>({
  currentUser: undefined,
  logout: () => {},
  login: () => {},
});

export default UserContext;
