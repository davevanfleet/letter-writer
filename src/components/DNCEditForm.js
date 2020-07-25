import React, {useState, useEffect} from 'react';
import { config } from '../constants';

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
        fetch(`${config.url.API_URL}/territories/${props.dnc.territory_id}/dncs/${props.dnc.id}`, configObj)
            .then(r => r.json())
            .then(d => {
                props.handleFinishEdit()
            })
    }

    return (
        <>
            <h3>Edit Do-Not-Call</h3>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={e => handleAddressChange(e)} value={address} />
                <p>Date: <input type="date" name="date" value={date} onChange={e => handleDateChange(e)} /></p>
                <input type="submit" value="Update DNC" />
            </form>
        </>
    )
}

export default DNCEditForm;