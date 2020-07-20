import React, { useState } from 'react';

const DNCs = (props) => {
    const [address, setAddress] = useState('')
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const [territory,setTerritory] = useState('')
    const handleTerritoryChange = (e) => {
        setTerritory(e.target)
    }

    const submitDnc = (e) => {
        e.preventDefault()
    } 

    return(
        <>
            <p>I pitty da fool that calls these fools</p>
            <form onSubmit={e => submitDnc(e)}>
                <p>Address: <input type="text" name="address" value={address} onChange={e => handleAddressChange(e)} /></p>
                <p>Territory: <input type="text" name="territory" value={territory} onChange={e => handleTerritoryChange(e)} /></p>
            </form>
        </>
    )
}

export default DNCs;