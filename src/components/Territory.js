import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'uuid';
import { CSVLink } from "react-csv";
import CheckBox from './CheckBox';
import { config } from '../constants';


const Territory = (props) => {
    const [ displayAssingmentModal, setDisplayAssignmentModal ] = useState(false)

    const headers = [
        { label: "Name", key: "name" },
        { label: "Address", key: "address" },
        { label: "Phone", key: "phone" },
        { label: "Check When Finished", key: "blank"}
      ]
    
    const dncHeaders = [
      { label: "Address", key: "address" },
      { label: "Date", key: "date" }
    ]
    
    const assignmentRows = props.assignments.map(assignment => <tr key={uuid()}><td>{assignment.publisher}</td><td>{assignment.check_out}</td><td>{assignment.check_in}</td></tr>)
    return(
        <div>
            <h2>Assignments</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Publisher:</th>
                        <th>Checked Out:</th>
                        <th>Checked In:</th>
                    </tr>
                </thead>
                <tbody>
                    { assignmentRows }
                </tbody>
            </Table>
            <button className="btn btn-primary">
                Assign Territory
            </button>

            <h2>DNCs</h2>
            <span>{props.dncs.length} DNC{props.dncs.length !== 1 && 's'} loaded</span>
            <br />
            <CSVLink data={props.dncs} 
                     headers={dncHeaders}
                     filename={`${props.name}-DNCs.csv`}
                     className="btn btn-primary">
                         Download DNCs
            </CSVLink>
           
            <h2>Contacts</h2>
            <span>{props.contacts.length} Contacts loaded</span>
            <br />
            <CSVLink data={props.contacts} 
                     headers={headers}
                     filename={`${props.name}.csv`}
                     className="btn btn-primary">
                         Download Territory
            </CSVLink>
        </div>
    )
}

export default Territory