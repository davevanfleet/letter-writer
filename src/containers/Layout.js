import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
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
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">DNCs</Dropdown.Toggle>
                            <Dropdown.Menu align="left">
                                <LinkContainer to="/DNCs">
                                    <Dropdown.Item>DNC by Territory</Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/all_DNCs">
                                    <Dropdown.Item>ALL DNCs</Dropdown.Item>
                                </LinkContainer>
                            </Dropdown.Menu>
                        </Dropdown>
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