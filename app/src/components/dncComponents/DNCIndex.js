import React, { useState, useEffect } from 'react';
import { config } from '../../constants';
import { CSVLink } from "react-csv";
import { Table } from 'react-bootstrap';


const DNCIndex = (props) => {
    const [dncs, setDncs] = useState([])
    useEffect(() => {
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/dncs`)
            .then(r => {
                if(!r.ok){throw r}
                return r.json()
            })
            .then(d => {
                setDncs(d)
            })
    }, [])

    const rows = dncs.map((dnc) => {
        return (
            <tr>
                <td>{dnc.address}</td>
                <td>{dnc.territory.name}</td>
                <td>{dnc.date}</td>
            </tr>
        )
    })

    const dncHeaders = [
        { label: "Address", key: "address" },
        { label: "Territory", key: "territory.name"},
        { label: "Date", key: "date" }
      ]

    return (
        <div>
            <h3>All DNCs</h3>
            <CSVLink data={dncs} 
                     headers={dncHeaders}
                     filename={`all-DNCs.csv`}
                     className="btn btn-primary">
                         Download DNCs
            </CSVLink>
            <Table responsive>
                <thead>
                    <tr>
                        <th scope="col">Address</th>
                        <th scope="col">Terrritory</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default DNCIndex;