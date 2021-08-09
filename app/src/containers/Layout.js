import React from 'react';
import TopMenu from '../components/TopMenu';

const Layout = (props) => {
    return(
        <div className="layout">
            <TopMenu currentUser={props.currentUser} logout={props.logout} />
            {props.flash.length > 0 && <div className="alert alert-primary">{props.flash}</div>}
            {props.children}
        </div>
    )
}

export default Layout