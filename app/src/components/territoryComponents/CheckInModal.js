import React, { useState } from 'react';
import { config } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const CheckInModal = (props) => {
    const [ checkIn, setCheckIn ] = useState('')
    const handleCheckInChange = (e) => {
        setCheckIn(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const configObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                assignment: {
                    ...props.assignment,
                    checked_in: checkIn
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${props.congregationId}/territories/${props.territoryId}/assignments/${props.assignment.id}`, configObj)
            .then( r => {
                if (!r.ok){ throw r }
                return r.json()
            })
            .then(d => {
                props.handleClose()
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
                                 onClick={props.handleClose} />
                <h1>Check In Territory</h1>
                <p>Publisher: <em>{props.assignment.publisher}</em></p>
                <p>Checked Out: <em>{props.assignment.checked_out}</em></p>
                <div className="input-row">
                    <label htmlFor="date">Check In Date:</label>
                    <input type="date"
                           name="date"
                           value={checkIn}
                           onChange={handleCheckInChange} />
                </div>
                <div>
                    <button className="btn btn-primary"
                            onClick={handleSubmit}>
                        Check In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckInModal;