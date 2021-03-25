import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
                        <NavDropdown title="Territories" id="basic-nav-dropdown">
                            <LinkContainer to="/territories">
                                <NavDropdown.Item>Territories</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/upload_contacts">
                                <NavDropdown.Item>Upload Contact List</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="DNCs" id="basic-nav-dropdown">
                            <LinkContainer to="/DNCs">
                                <NavDropdown.Item>DNC by Territory</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/all_DNCs">
                                <NavDropdown.Item>All DNCs</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/upload_DNCs">
                                <NavDropdown.Item>Upload DNCs</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </>
                )}
                <Nav className="ml-auto">
                    {props.currentUser ? <LinkContainer to="/"><Nav.Link onClick={event => props.logout(event)}>Logout</Nav.Link></LinkContainer> : null}
                </Nav>
            </Navbar>
            {props.flash.length > 0 && <div className="alert alert-primary">{props.flash}</div>}
            {props.children}
        </div>
    )
}

export default Layout