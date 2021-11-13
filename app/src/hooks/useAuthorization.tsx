import React from 'react';
import { useHistory } from 'react-router';
import { IRole } from '../constants';
import { useUserContext } from '../contexts/UserContext';

const useAuthorization = (role: IRole) => {
  const { currentUser } = useUserContext();
  const history = useHistory();
  if (currentUser?.role !== role) history.push('/');
};

export default useAuthorization;
