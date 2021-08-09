import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Home = (props) => {

    return(
        <>
            <h1>Territory Counter</h1>
            <div className="home">
                {props.currentUser && <p>Hello, {props.currentUser.name}!</p>}
                <p>Welcome to Territory Counter, used to maintain congregation territories and do-not-calls.</p>
                <ul>
                    <li><LinkContainer to="/territories"><Nav.Link>View Territories</Nav.Link></LinkContainer></li>
                    <li><LinkContainer to="/DNCs"><Nav.Link>View/Maintain DNC List</Nav.Link></LinkContainer></li>
                </ul>
            </div>
        </>
    )
}

export default Home;