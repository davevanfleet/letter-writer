import React, {useState} from 'react';
import { config } from '../constants';

const DNCEditForm = (props) => {
    const [address, setAddress] = useState(props.address)
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        configObj = {
            "method": "PUT",
            "headers": {
                "content-type": "appliation/json",
                "accepts": "aplication/json"
            },
            "body": JSON.stringify({"address": address})
        }
        fetch(`${config.url.API_URL}/territories/${props.territoryId}/dncs/${props.DncId}`)
            .then(r => r.json())
            .then(d => {
                console.log(d)
            })
    }

    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={e => handleAddressChange(e)} value={address}
            </form>
        </>
    )
}