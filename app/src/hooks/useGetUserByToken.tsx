import { IUser } from '../shared/interfaces';
import axios from 'axios';
import { config } from '../constants';
import { useState } from 'react';

const useGetUserByToken = (): IUser | undefined => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const token = localStorage.getItem('token');
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
  return currentUser;
};

export default useGetUserByToken;
