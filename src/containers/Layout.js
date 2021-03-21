import React from 'react';
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
                {props.currentUser && (
                    <>
                        <LinkContainer to="/territories">
                            <Navbar.Brand>Territories</Navbar.Brand>
                        </LinkContainer>
                        <LinkContainer to="/DNCs">
                            <Navbar.Brand>DNCs</Navbar.Brand>
                        </LinkContainer>
                        <LinkContainer to="/all_DNCs">
                            <Navbar.Brand>DNC Master List</Navbar.Brand>
                        </LinkContainer>
                    </>
                )}
                <Nav className="ml-auto">
                    {props.currentUser ? <LinkContainer to="/"><Nav.Link onClick={event => props.logout(event)}>Logout</Nav.Link></LinkContainer> : null}
                </Nav>
            </Navbar>
            {props.children}
        </div>
    )
}

export default Layout