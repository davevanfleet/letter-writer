import React, { useState } from 'react';
import { config } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

interface INewAssignmentModalProps {
    handleClose: () => void;
    congregationId: number;
    territoryId: number;
}

const NewAssignmentModal = ({congregationId, territoryId, handleClose}: INewAssignmentModalProps): JSX.Element => {
    const [ publisher, setPublisher ] = useState('')
    const handlePublisherChange = (e: any) => {
        setPublisher(e.currentTarget.value)
    }

    const [ checkOut, setCheckOut ] = useState('')
    const handleCheckOutChange = (e: any) => {
        setCheckOut(e.currentTarget.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                assignment: {
                    publisher,
                    checked_out: checkOut
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${congregationId}/territories/${territoryId}/assignments`, configObj)
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
                <h1>Checkout Territory</h1>
                <div className="input-row">
                    <label htmlFor="pubName">Publisher Name:</label>
                    <input type="text"
                           name="pubName"
                           value={publisher}
                           onChange={handlePublisherChange} />
                </div>
                <div className="input-row">
                    <label htmlFor="date">Check Out Date:</label>
                    <input type="date"
                           name="date"
                           value={checkOut}
                           onChange={handleCheckOutChange} />
                </div>
                <div>
                    <button className="btn btn-primary"
                            onClick={handleSubmit}>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewAssignmentModal;