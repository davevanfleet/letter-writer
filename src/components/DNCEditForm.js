import React, {useState, useEffect} from 'react';
import { config } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const DNCEditForm = (props) => {
    const [address, setAddress] = useState(props.dnc.address)
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const [name, setName] = useState(props.dnc.name || '')
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const [publisher, setPublisher] = useState(props.dnc.publisher || '')
    const handlePublisherChange = (e) => {
        setPublisher(e.target.value)
    }

    const [description, setDescription] = useState(props.dnc.notes || '')
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const [date, setDate] = useState(props.dnc.date)
    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    useEffect(() => {
        setAddress(props.dnc.address)
        setDate(props.dnc.date)
    }, [props.dnc])

    const handleSubmit = (e) => {
        e.preventDefault()
        const configObj = {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            "body": JSON.stringify({
                "dnc": {
                    address,
                    "territory_id": props.dnc.territory_id,
                    name,
                    publisher,
                    "notes": description,
                    date
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/territories/${props.dnc.territory_id}/dncs/${props.dnc.id}`, configObj)
            .then(r => r.json())
            .then(d => {
                props.handleFinishEdit()
            })
    }

    return (
        <div className="dnc-form">
            <h3>Edit Do-Not-Call</h3>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="input-row">
                    <label htmlFor="address">Address:</label><input type="text" name="address" value={address} onChange={e => handleAddressChange(e)} />
                </div>
                <div className="input-row">
                    <label htmlFor="name">DNC Name:</label><input type="text" name="name" value={name} onChange={e => handleNameChange(e)} />
                </div>
                <div className="input-row">
                    <label htmlFor="publisher">Publisher:</label><input type="text" name="publisher" value={publisher} onChange={e => handlePublisherChange(e)} />
                </div>
                <div className="input-row">
                    <label htmlFor="notes">Notes:</label><input type="text" name="notes" value={description} onChange={e => handleDescriptionChange(e)} />
                </div>
                <div className="input-row">
                    <label>Date:</label><input type="date" name="date" value={date} onChange={e => handleDateChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Update DNC" />
            </form>
            <FontAwesomeIcon icon={faTimesCircle} onClick={props.handleClose}/>
        </div>
    )
}

export default DNCEditForm;