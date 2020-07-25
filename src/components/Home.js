import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Home = (props) => {

    return(
        <>
            <h1>Letter Writer</h1>
            <div className="home">
                <p>Welcome to Letter Writer, used to maintain letter writing territories and our do-not-call-list.</p>
                <ul>
                    <li><LinkContainer to="/territories"><Nav.Link>View Letter Writing Territories</Nav.Link></LinkContainer></li>
                    <li><LinkContainer to="/DNCs"><Nav.Link>View/Maintain DNC List</Nav.Link></LinkContainer></li>
                </ul>
            </div>
        </>
    )
}

export default Home;