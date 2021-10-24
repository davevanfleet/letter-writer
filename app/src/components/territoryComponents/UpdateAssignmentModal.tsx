import React, { useState } from 'react';
import { config } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { IAssignment } from '../../shared/interfaces';

interface IUpdateAssignmentModal {
    assignment: IAssignment;
    congregationId: number;
    territoryId: number;
    handleClose: () => void;
}

const UpdateAssignmentModal = ({assignment, congregationId, territoryId, handleClose}: IUpdateAssignmentModal): JSX.Element => {
    const [ publisher, setPublisher ] = useState(assignment.publisher)
    const handlePublisherChange = (e: any) => {
        setPublisher(e.currentTarget.value)
    }

    const [ checkOut, setCheckOut ] = useState(assignment.checked_out)
    const handleCheckOutChange = (e: any) => {
        setCheckOut(e.currentTarget.value)
    }

    const [ checkIn, setCheckIn ] = useState(assignment.checked_in)
    const handleCheckInChange = (e: any) => {
        setCheckIn(e.currentTarget.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const configObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                assignment: {
                    publisher,
                    checked_out: checkOut,
                    checked_in: checkIn
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${congregationId}/territories/${territoryId}/assignments/${assignment.id}`, configObj)
            .then( r => {
                if (!r.ok){ throw r }
                return r.json()
            })
            .then(d => {
                handleClose()
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div id="assignment-modal">
            <div id="assignment-modal-body">
                <FontAwesomeIcon className="close-btn"
                                 icon={faTimesCircle}
                                 size="3x"
                                 onClick={handleClose} />
                <h1>Update Assignment</h1>
                <div className="input-row">
                    <label htmlFor="pubName">Publisher:</label>
                    <input type="ext"
                           name="pubName"
                           value={publisher}
                           onChange={handlePublisherChange} />
                </div>
                <div className="input-row">
                    <label htmlFor="checkOut">Check Out Date:</label>
                    <input type="date"
                           name="checkOut"
                           value={checkOut}
                           onChange={handleCheckOutChange} />
                </div>
                <div className="input-row">
                    <label htmlFor="checkIn">Check In Date:</label>
                    <input type="date"
                           name="checkIn"
                           value={checkIn}
                           onChange={handleCheckInChange} />
                </div>
                <div>
                    <button className="btn btn-primary"
                            onClick={handleSubmit}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateAssignmentModal;