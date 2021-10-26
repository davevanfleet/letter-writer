import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IUser } from '../shared/interfaces';
import React from 'react';
import TopMenu from './menuComponents/TopMenu';

interface ILayoutProps {
  currentUser: IUser;
  logout: () => void;
  children: React.ReactNode;
  flash: string[];
}

const theme = createTheme({ spacing: 4 });

const Layout = ({ currentUser, logout, children, flash }: ILayoutProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <div className="layout">
      {/* <TopMenu currentUser={currentUser} logout={logout} /> */}
      <TopMenu />
      {flash.length > 0 && <div className="alert alert-primary">{flash}</div>}
      {children}
    </div>
  </ThemeProvider>
);

export default Layout;
