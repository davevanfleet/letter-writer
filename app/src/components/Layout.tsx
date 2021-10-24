import React from 'react';
import { IUser } from '../shared/interfaces';
import TopMenu from './TopMenu';

interface ILayoutProps {
    currentUser: IUser;
    logout: () => void;
    children?: React.ReactNode;
    flash: string[];
}

const Layout = ({currentUser, logout, children, flash}: ILayoutProps): JSX.Element => {
    return(
        <div className="layout">
            <TopMenu currentUser={currentUser} logout={logout} />
            {flash.length > 0 && <div className="alert alert-primary">{flash}</div>}
            {children}
        </div>
    )
}

export default Layout