import React, { useState } from 'react';
import { config } from '../constants';
import uuid from 'uuid';

const DNCNewForm = (props) => {
    const [address, setAddress] = useState('')
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const today = new Date()
    let month = today.getMonth()
    if(month < 9){
        month = `0${month + 1}`
    } else {
        month += 1
    }
    const [date, setDate] = useState(`${today.getFullYear()}-${month}-${today.getDate()}`)
    const handleDateChange = (e) => {
        setDate(e.target.value)
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
            "body": JSON.stringify({
                "dnc": {
                    "address": address,
                    "territory_id": territoryId,
                    "date": date
                }
            })
        }
        fetch(`${config.url.API_URL}/territories/${territoryId}/dncs`, configObj)
            .then(r=>r.json())
            .then(d => {
                setAddress('')
                setTerritoryId('0')
                props.handleFinishCreate()
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
                <p>Date: <input type="date" name="date" value={date} onChange={e => handleDateChange(e)} /></p>
                <input type="submit" className="btn btn-primary" value="Add DNC" />
            </form>
        </>
    )
}

export default DNCNewForm;