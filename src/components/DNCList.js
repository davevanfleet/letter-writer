import React, { useState, useEffect } from 'react';
import { config } from '../constants';
import uuid from 'uuid';

const DNCList = (props) => { 
    const [query, setQuery] = useState('0')
    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    const [addresses, setAddresses] = useState([])
    useEffect(() => {
        setAddresses(props.allDncs.filter(dnc => dnc.territory_id === parseInt(query, 10)))
    }, [query, props.allDncs])

    const handleDeleteClick = (e, id) => {
        e.preventDefault()
        if (window.confirm("Are You sure you want to delete this do-not-call?")){
            const configObj = {
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json",
                    "accepts": "aplication/json"
                }
            }
            fetch(`${config.url.API_URL}/territories/${query}/dncs/${id}`, configObj)
                .then(r => r.json())
                .then(d => {
                    setAddresses(addresses.filter(address => address.id !== id))})
        }
    }

    const rows = addresses.map((dnc) => {
        return (
            <tr>
                <td>{dnc.address}</td>
                <td>{dnc.date}</td>
                <td><button className="btn btn-warning" onClick={(e) => props.handleEditClick(e, dnc)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={(e) => handleDeleteClick(e, dnc.id)}>Delete</button></td>
            </tr>
        )
    })

    return (
        <>
            <h3>View Existing Do-Not-Calls</h3>
            <p>Territory: <select name="territory" onChange={e => handleQueryChange(e)} value={query}>
                <option key={uuid()} value="0">Select a Territory</option>
                {props.sortedTerritories}
            </select></p>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    )
}

export default DNCList;