import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { IUser } from '../shared/interfaces';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';

interface ITopMenuProps {
  currentUser: IUser;
  logout: () => void;
}

const TopMenu = ({ currentUser, logout }: ITopMenuProps) => (
  <Navbar collapseOnSelect expand="md" bg="light">
    <LinkContainer to="/">
      <Navbar.Brand>
        <img src={`${process.env.PUBLIC_URL}/counterSilhouette.png`} alt="Home" />
      </Navbar.Brand>
    </LinkContainer>
    {currentUser ? (
      <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {currentUser.role === 'Admin' && (
            <>
              <NavDropdown title="Territories" id="basic-nav-dropdown">
                <LinkContainer to="/territories">
                  <NavDropdown.Item>Territories</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/new_territory">
                  <NavDropdown.Item>Add Territory</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/territory_records">
                  <NavDropdown.Item>Territory Record Book</NavDropdown.Item>
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
            <LinkContainer to="/users">
              <Nav.Link>Publishers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </>
    ) : (
      <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </>
    )}
  </Navbar>
);

export default TopMenu;
