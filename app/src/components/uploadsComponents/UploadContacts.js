/* eslint-disable react/prop-types */
import * as XLSX from 'xlsx';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '../../constants';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const UploadContacts = (props) => {
  const [uploading, setUploading] = useState(false);

  const form = useRef(null);
  const fileInput = useRef(null);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const history = useHistory();

  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = [
      'firstName',
      'lastName',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'lat',
      'lng',
      'lang',
    ];
    const list = [];
    for (let i = 0; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') {
              d = d.substring(1, d.length - 1);
            }
            if (d[d.length - 1] === '"') {
              d = d.substring(d.length - 2, 1);
            }
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }
    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));
    setData(list);
    setColumns(columns);
    sendCreateRequests(list);
  };

  const sendCreateRequests = (csvRows) => {
    setUploading(true);
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ external_contact: { contacts: csvRows } }),
    };
    fetch(
      `${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/external_contacts`,
      configObj,
    )
      .then((r) => r.json())
      .then((d) => {
        props.addFlash(
          'List submitted for update. Please be patient for contacts to completely load, it may take a few minutes.',
        );
        setUploading(false);
        history.push('/territories');
      })
      .catch((d) => {
        props.addFlash('Uh Oh! Something went wrong. Please try again.');
        history.push('/territories');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };
  if (!uploading) {
    return (
      <>
        <h1>Upload Addresses</h1>
        <p>
          Use this page if you have an existing contact list for your <em>entire</em> territory from
          an outside source.
        </p>
        <p>
          <strong>
            <em>
              If you have address-lookup access on this site, you shouldn&apos;t need to use this
              page.
            </em>
          </strong>
        </p>
        <p>Please note the following requirements for the uploaded file:</p>
        <div className="container">
          <ul className="csv-requirements">
            <li>File must be formatted as a CSV (comma separated values)</li>
            <li>
              CSV must have the following columns, in this exact order:
              <ol>
                <li>First Name of Householder</li>
                <li>Last Name of Householder</li>
                <li>
                  Phone Number (must be present - can list &quot;Not Available&quot; if no phone
                  number)
                </li>
                <li>Address</li>
                <li>City</li>
                <li>State</li>
                <li>Zip Code</li>
                <li>Latitude</li>
                <li>Longitude</li>
                <li>Primary Language (optional)</li>
              </ol>
            </li>
            <li>There must be no header row</li>
            <li>Each row must contain one Contact</li>
          </ul>
        </div>
        <form ref={form} onSubmit={handleSubmit}>
          <input id="image-upload" name="file" type="file" accept=".csv" ref={fileInput} />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <br />
        <p>Uploading...</p>
        <br />
        <FontAwesomeIcon icon={faSpinner} size="6x" spin />
      </>
    );
  }
};

export default UploadContacts;
