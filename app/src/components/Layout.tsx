import { IUser } from '../shared/interfaces';
import React from 'react';
import TopMenu from './TopMenu';

interface ILayoutProps {
  currentUser: IUser;
  logout: () => void;
  children: React.ReactNode;
  flash: string[];
}

const Layout = ({ currentUser, logout, children, flash }: ILayoutProps): JSX.Element => (
  <div className="layout">
    <TopMenu currentUser={currentUser} logout={logout} />
    {flash.length > 0 && <div className="alert alert-primary">{flash}</div>}
    {children}
  </div>
);

export default Layout;
