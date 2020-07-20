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

    const [territory, setTerritory] = useState('')
    const handleTerritoryChange = (e) => {
        setTerritory(e.target.value)
    }

    const submitDnc = (e) => {
        e.preventDefault()
    } 

    const sortedTerritories = territories.sort((a, b) => {return (a.name < b.name ? -1 : 1)}).map(t => <option key={uuid()} value={t.name}>{t.name}</option>)

    return(
        <>
            <p>I pitty da fool that calls these fools</p>
            <form onSubmit={e => submitDnc(e)}>
                <p>Address: <input type="text" name="address" value={address} onChange={e => handleAddressChange(e)} /></p>
                <p>Territory: <select name="territory" onChange={e => handleTerritoryChange(e)} value={territory}>
                        <option key={uuid()} value="0">Select a Territory</option>
                        {sortedTerritories}
                    </select></p>
            </form>
        </>
    )
}

export default DNCs;