import React, {useState, useEffect} from 'react';
import { config } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const DNCEditForm = (props) => {
    const [address, setAddress] = useState(props.dnc.address)
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
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
                    "address": address,
                    "territory_id": props.dnc.territory_id,
                    "date": date
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/territories/${props.dnc.territory_id}/dncs/${props.dnc.id}`, configObj)
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
                    <label htmlFor="address">Address:</label><input type="text" name="address" onChange={e => handleAddressChange(e)} value={address} />
                </div>
                <div className="input-row">
                    <label htmlFor="date">Date:</label><input type="date" name="date" value={date} onChange={e => handleDateChange(e)} />
                </div>
                <input type="submit" value="Update DNC" className="btn btn-primary"/>
            </form>
            <FontAwesomeIcon icon={faTimesCircle} onClick={props.handleClose}/>
        </div>
    )
}

export default DNCEditForm;