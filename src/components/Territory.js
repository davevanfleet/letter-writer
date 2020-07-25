import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'uuid';
import { CSVLink } from "react-csv";
import CheckBox from './CheckBox';
import { config } from '../constants';

const Territory = (props) => {
    const [dncs, setDncs] = useState([])
    useEffect(() => {
        fetch(`${config.url.API_URL}/territories/${props.territoryId}/dncs`)
            .then(r => r.json())
            .then(d => setDncs(d))
    }, [props.territoryId])

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
    
    const contacts = props.contacts.map(contact => <tr key={uuid()}><td>{contact.name}</td><td>{contact.address}</td><td>{contact.phone}</td><CheckBox id={contact.id} /></tr>)
    const dncRows = dncs.map(dnc => <tr key={uuid()}><td>{dnc.address}</td><td>{dnc.date}</td></tr>)
    return(
        <div>
            <p>{props.contacts.length} Contacts Loaded</p>
            <CSVLink data={props.contacts} 
                     headers={headers}
                     filename={`${props.name}.csv`}
                     className="btn btn-primary">
                         Download Territory
            </CSVLink>
            <h2>Contacts</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Address:</th>
                        <th>Phone:</th>
                        <th>Check When Done:</th>
                    </tr>
                </thead>
                <tbody>
                    { contacts }
                </tbody>
            </Table>
            <h2>DNCs</h2>
            <CSVLink data={dncs} 
                     headers={dncHeaders}
                     filename={`${props.name}-DNCs.csv`}
                     className="btn btn-primary">
                         Download DNCs
            </CSVLink>
            <Table>
                <thead>
                    <tr>
                        <th>Address:</th>
                        <th>Date:</th>
                    </tr>
                </thead>
                <tbody>
                    {dncRows}
                </tbody>
            </Table>
        </div>
    )
}

export default Territory