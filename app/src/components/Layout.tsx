import { IUser } from '../shared/interfaces';
import React from 'react';
import TopMenu from './TopMenu';
import { useUserContext } from '../context/UserContext';

interface ILayoutProps {
  logout: () => void;
  children: React.ReactNode;
  flash: string[];
}

const Layout = ({ logout, children, flash }: ILayoutProps): JSX.Element => {
  const { currentUser } = useUserContext();

  return (
    <div className="layout">
      <TopMenu currentUser={currentUser} logout={logout} />
      {flash.length > 0 && <div className="alert alert-primary">{flash}</div>}
      {children}
    </div>
  );
}

export default Layout;
