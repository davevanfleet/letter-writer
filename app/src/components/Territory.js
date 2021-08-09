import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'uuid';
import { CSVLink } from "react-csv";
import CheckBox from './CheckBox';
import { config } from '../constants';
import NewAssignmentModal from './NewAssignmentModal';
import CheckInModal from './CheckInModal';
import UpdateAssignmentModal from './UpdateAssignmentModal';


const Territory = (props) => {
    const [ displayAssignmentModal, setDisplayAssignmentModal ] = useState(false)
    const [ displayCheckInModal, setDisplayCheckInModal ] = useState(false)
    const [ displayUpdateModal, setDisplayUpdateModal ] = useState(false)
    const [ assignmentFocus, setAssignmentFocus ] = useState()

    const handleCloseModals = () => {
        setDisplayAssignmentModal(false)
        setDisplayCheckInModal(false)
        setDisplayUpdateModal(false)
        props.refreshTerritory()
    }

    const deleteAssignment = (id) => {
        const configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        }
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/territories/${props.territoryId}/assignments/${id}`, configObj)
            .then(r => {

                if (!r.ok){ throw r }
                return r.json()
            })
            .then(d => {
                console.log("in delete")
                props.refreshTerritory()
            })
            .catch(e => {
                console.log(e)
            })
    }

    const headers = [
        { label: "Name", key: "name" },
        { label: "Address", key: "address" },
        { label: "Phone", key: "phone" },
        { label: "Primary Language", key: "lang" },
        { label: "Check When Finished", key: "blank"}
      ]
    
    const dncHeaders = [
      { label: "Address", key: "address" },
      { label: "Date", key: "date" }
    ]

    const assignmentRows = props.assignments.map(assignment => {
        return (
            <tr key={uuid()}>
                <td>{assignment.publisher}</td>
                <td>{assignment.checked_out}</td>
                <td>{assignment.checked_in || <button className="btn btn-secondary"
                                                      onClick={() => {
                                                          setAssignmentFocus(assignment)
                                                          setDisplayCheckInModal(true)
                                                      }}>
                                                  Check In
                                              </button>}</td>
                <td>
                    {assignment.checked_out && assignment.checked_in && <button className="btn btn-warning"
                                                                            onClick={() => {
                                                                                setAssignmentFocus(assignment)
                                                                                setDisplayUpdateModal(true)
                                                                            }}>
                                                                            Edit
                                                                        </button>
                    }
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={() => {
                                deleteAssignment(assignment.id)
                            }}>
                        Delete
                    </button>
                </td>
            </tr>
        )})

    const contacts = props.contacts.map(contact => <tr key={uuid()}><td>{contact.name}</td><td>{contact.address}</td><td>{contact.phone}</td><td>{contact.lang}</td><CheckBox id={contact.id} /></tr>)
    const dncRows = props.dncs.map(dnc => <tr key={uuid()}><td>{dnc.address}</td><td>{dnc.date}</td></tr>)
    return(
        <div>
            <h2>Assignments</h2>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Publisher:</th>
                        <th>Checked Out:</th>
                        <th>Checked In:</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { assignmentRows }
                </tbody>
            </Table>
            {(!props.assignments[props.assignments.length -1] || props.assignments[props.assignments.length -1].checked_in) && 
                <button className="btn btn-primary"
                        onClick={() => setDisplayAssignmentModal(true)}>
                    Check Out
                </button>
            }

            <h2>DNCs</h2>
            <CSVLink data={props.dncs} 
                     headers={dncHeaders}
                     filename={`${props.name}-DNCs.csv`}
                     className="btn btn-primary">
                         Download DNCs
            </CSVLink>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {dncRows}
                </tbody>
            </Table>
            <h2>Contacts</h2>
            <p>{props.contacts.length} contacts loaded</p>
            <CSVLink data={props.contacts} 
                     headers={headers}
                     filename={`${props.name}.csv`}
                     className="btn btn-primary">
                         Download Territory
            </CSVLink>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Primary Language</th>
                        <th>Check When Done</th>
                    </tr>
                </thead>
                <tbody>
                    { contacts }
                </tbody>
            </Table>
            <br />
            {displayAssignmentModal && <NewAssignmentModal congregationId={props.currentUser.congregation.id} territoryId={props.territoryId} handleClose={handleCloseModals} />}
            {displayCheckInModal && assignmentFocus && <CheckInModal congregationId={props.currentUser.congregation.id} territoryId={props.territoryId} assignment={assignmentFocus} handleClose={handleCloseModals} />}
            {displayUpdateModal && assignmentFocus && <UpdateAssignmentModal congregationId={props.currentUser.congregation.id} territoryId={props.territoryId} assignment={assignmentFocus} handleClose={handleCloseModals} />}
        </div>
    )
}

export default Territory