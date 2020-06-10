import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'uuid';
import { CSVLink } from "react-csv";

class Territory extends Component {
    render(){
        const headers = [
            { label: "Name", key: "name" },
            { label: "Address", key: "address" },
            { label: "Phone", key: "phone" },
            { label: "Check When Finished", key: "blank"}
          ]
        
        const contacts = this.props.contacts.map(contact => <tr key={uuid()}><td>{contact.name}</td><td>{contact.address}</td><td>{contact.phone}</td></tr>)
        return(
            <div>
                <CSVLink data={this.props.contacts} 
                         headers={headers}
                         filename={`${this.props.name}.csv`}
                         className="btn btn-primary">
                             Download Territory
                </CSVLink>
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
            </div>
        )
    }
}

export default Territory