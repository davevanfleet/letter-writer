import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = (props) => {
    return(
        <div className="layout">
            <Navbar collapseOnSelect expand="md" bg="light">
                <LinkContainer to="/">
                    <Navbar.Brand>Home</Navbar.Brand>
                </LinkContainer>
                <Nav className="ml-auto">
                    
                </Nav>
            </Navbar>
            {props.children}
        </div>
    )
}

export default withRouter(Layout)