import React, { useState } from 'react';
import { config } from '../constants';
import uuid from 'uuid';

const DNCNewForm = (props) => {
    const [address, setAddress] = useState()
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const [territoryId, setTerritoryId] = useState('0')
    const handleTerritoryChange = (e) => {
        setTerritoryId(e.target.value)
    }

    const submitDnc = (e) => {
        e.preventDefault()
        const configObj = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "accepts": "application/json"
            },
            "body": JSON.stringify({"dnc": address})
        }
        fetch(`${config.url.API_URL}/territories/${territoryId}/dncs`, configObj)
            .then(r=>r.json())
            .then(d => {
                setAddress('')
                setTerritoryId('0')
            })
    } 

    return(
        <>
            <h3>Add New Do-Not-Call</h3>
            <form onSubmit={e => submitDnc(e)}>
                <p>Address: <input type="text" name="address" value={address} onChange={e => handleAddressChange(e)} /></p>
                <p>Territory: <select name="territory" onChange={e => handleTerritoryChange(e)} value={territoryId}>
                        <option key={uuid()} value="0">Select a Territory</option>
                        {props.sortedTerritories}
                    </select></p>
                <input type="submit" className="btn btn-primary" value="Add DNC" />
            </form>
        </>
    )
}

export default DNCNewForm;