import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'uuid';
import { CSVLink } from "react-csv";
import CheckBox from './CheckBox';

class Territory extends Component {
    handleClick = (e) => {
        e.preventdefault()
        e.target.innerHTML = ''
    }

    render(){
        const headers = [
            { label: "Name", key: "name" },
            { label: "Address", key: "address" },
            { label: "Phone", key: "phone" },
            { label: "Check When Finished", key: "blank"}
          ]
        
        const contacts = this.props.contacts.map(contact => <tr key={uuid()}><td>{contact.name}</td><td>{contact.address}</td><td>{contact.phone}</td><CheckBox id={contact.id} /></tr>)
        return(
            <div>
                <p>{this.props.contacts.length} Contacts Loaded</p>
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