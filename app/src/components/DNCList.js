import React, { useState, useEffect } from 'react';
import { config } from '../constants';
import uuid from 'uuid';

const DNCList = (props) => { 
    // const [query, setQuery] = useState('0')
    // const handleQueryChange = (e) => {
    //     setQuery(e.target.value)
    // }

    const [addresses, setAddresses] = useState([])
    useEffect(() => {
        setAddresses(props.allDncs.filter(dnc => dnc.territory_id === parseInt(props.territoryId, 10)))
    }, [props.territoryId, props.allDncs])

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
            fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/territories/${props.territoryId}/dncs/${id}`, configObj)
                .then(r => r.json())
                .then(d => {
                    setAddresses(addresses.filter(address => address.id !== id))})
        }
    }

    const rows = addresses.map((dnc) => {
        return (
            <tr key={uuid()}>
                <td>{dnc.address}</td>
                <td>{dnc.name}</td>
                <td>{dnc.publisher}</td>
                <td>{dnc.date}</td>
                <td>{dnc.description}</td>
                <td><button className="btn btn-warning" onClick={(e) => props.handleEditClick(e, dnc)}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={(e) => handleDeleteClick(e, dnc.id)}>Delete</button></td>
            </tr>
        )
    })

    return (
        <>
            <h3>Do-Not-Calls by Territory</h3>
            <p>Territory: <select name="territory" onChange={e => props.handleTerritoryChange(e)} value={props.territoryId}>
                <option key={uuid()} value="0">Select a Territory</option>
                {props.sortedTerritories}
            </select></p>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Address</th>
                        <th scope="col">Name</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Date</th>
                        <th scope="col">Notes</th>
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