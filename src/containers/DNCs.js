import React, { useState, useEffect } from 'react';
import { config } from '../constants';
import uuid from 'uuid';

const DNCs = (props) => {
    const [territories, setTerritories] = useState([])
    useEffect(() => {
        fetch(`${config.url.API_URL}/territories`)
            .then(r => r.json())
            .then(d => setTerritories(d))
    }, [])

    const [address, setAddress] = useState('')
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const [territoryId, setTerritoryId] = useState('')
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

    const sortedTerritories = territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.id}>{t.name}</option>)

    return(
        <>
            <h3>Add new Do-Not-Call</h3>
            <form onSubmit={e => submitDnc(e)}>
                <p>Address: <input type="text" name="address" value={address} onChange={e => handleAddressChange(e)} /></p>
                <p>Territory: <select name="territory" onChange={e => handleTerritoryChange(e)} value={territoryId}>
                        <option key={uuid()} value="0">Select a Territory</option>
                        {sortedTerritories}
                    </select></p>
                <input type="submit" class="btn btn-primary" value="Add DNC" />
            </form>
        </>
    )
}

export default DNCs;