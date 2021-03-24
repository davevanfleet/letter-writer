import React, { useState, useRef } from 'react';
import { config } from '../constants';
import * as XLSX from 'xlsx';


const DNCUpload = (props) => {
    const form = useRef(null)
    const fileInput = useRef(null)

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = ["address", "territoryName", "date"];
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
          if (headers && row.length == headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              let d = row[j];
              if (d.length > 0) {
                if (d[0] == '"')
                  d = d.substring(1, d.length - 1);
                if (d[d.length - 1] == '"')
                  d = d.substring(d.length - 2, 1);
              }
              if (headers[j]) {
                obj[headers[j]] = d;
              }
            }
            // remove the blank rows
            if (Object.values(obj).filter(x => x).length > 0) {
              list.push(obj);
            }
          }
        }
        // prepare columns list from headers
        const columns = headers.map(c => ({
          name: c,
          selector: c,
        }));
        setData(list);
        setColumns(columns);
        sendCreateRequests(list);
    }

    const sendCreateRequests = (csvRows) => {
        csvRows.forEach(row => {
            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Accepts': "application/json"
                },
                body: JSON.stringify({
                    address: row.address,
                    territoryName: row.territory,
                    date: row.date
                })
            }
            fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation_id}/dncs`, configObj)
                .then(r => r.json())
                .then(d => console.log(d))
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = fileInput.current.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    }

    return (
        <>
            <h1>Upload Do-Not-Calls</h1>
            <p>Use this page if you have an existing DNC list that you would like to load into your account. Please note the following requirements for the uploaded file:</p>
            <div className="container">
                <ul className="csv-requirements">
                    <li>File must be formatted as a CSV (comma separated values)</li>
                    <li>CSV must have three columns, in the following order:
                        <ol>
                            <li>Address of the DNC</li>
                            <li>Name of the Territory the DNC is in (must match a territory name saved in your account)</li>
                            <li>Date DNC added</li>
                        </ol>
                    </li>
                    <li>There must be no header row</li>
                    <li>Each row must contain one DNC</li>
                </ul>
            </div>
            <form ref={form} onSubmit={handleSubmit}>
                <input id="image-upload"
                        name="file"
                        type='file'
                        accept=".csv"
                        ref={fileInput}/>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </>
    )
}

export default DNCUpload;