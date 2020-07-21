import React, { useState, useEffect } from 'react';
import { config } from '../constants';

const DNCList = (props) => { 
    const [addresses, setAddresses] = useState([])
    useEffect(() => {
        if(props.territoryId != 0){
            fetch(`${config.url.API_URL}/territories/${props.territoryId}/dncs`)
                .then(r => r.json())
                .then(d => setAddresses(d))
                .catch(e => console.log(e))
        }
    },[props.territoryId])

    const rows = addresses.map((address) => {
        return <tr><td>{address.address}</td><td>Edit</td><td>Delete</td></tr>
    })

    console.log(addresses)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Address</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default DNCList;