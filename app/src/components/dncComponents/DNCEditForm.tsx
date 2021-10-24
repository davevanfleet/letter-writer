import React, {useState, useEffect} from 'react';
import { config } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { IDnc, IUser } from '../../shared/interfaces';

interface IDNCEditFormProps {
    dnc: IDnc;
    currentUser: IUser;
    handleFinishEdit: () => void;
    handleClose: () => void;
}

const DNCEditForm = ({dnc, currentUser, handleFinishEdit, handleClose}: IDNCEditFormProps): JSX.Element => {
    const [address, setAddress] = useState(dnc.address)
    const handleAddressChange = (e: any) => {
        setAddress(e.target.value)
    }

    const [name, setName] = useState(dnc.name || '')
    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const [publisher, setPublisher] = useState(dnc.publisher || '')
    const handlePublisherChange = (e: any) => {
        setPublisher(e.target.value)
    }

    const [description, setDescription] = useState(dnc.notes || '')
    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value)
    }

    const [date, setDate] = useState(dnc.date)
    const handleDateChange = (e: any) => {
        setDate(e.target.value)
    }

    useEffect(() => {
        setAddress(dnc.address)
        setDate(dnc.date)
    }, [dnc])

    const handleSubmit = (e: any) => {
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
                    "territory_id": dnc.territory_id,
                    name,
                    publisher,
                    "notes": description,
                    date
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories/${dnc.territory_id}/dncs/${dnc.id}`, configObj)
            .then(r => r.json())
            .then(d => {
                handleFinishEdit()
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
            <FontAwesomeIcon icon={faTimesCircle} onClick={handleClose}/>
        </div>
    )
}

export default DNCEditForm;