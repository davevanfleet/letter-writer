import { IUser } from '../shared/interfaces';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

interface IHomeProps {
  currentUser: IUser;
}

const Home = ({ currentUser }: IHomeProps): JSX.Element => (
  <>
    <h1>Territory Counter</h1>
    <div className="home">
      {currentUser && (
        <p>
          Hello,
          {currentUser.name}!
        </p>
      )}
      <p>
        Welcome to Territory Counter, used to maintain congregation territories and do-not-calls.
      </p>
      <ul>
        <li>
          <LinkContainer to="/territories">
            <Nav.Link>View Territories</Nav.Link>
          </LinkContainer>
        </li>
        <li>
          <LinkContainer to="/DNCs">
            <Nav.Link>View/Maintain DNC List</Nav.Link>
          </LinkContainer>
        </li>
      </ul>
    </div>
  </>
);

export default Home;
