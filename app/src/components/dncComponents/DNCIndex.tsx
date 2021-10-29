import { IDnc, IUser } from '../../shared/interfaces';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Table } from 'react-bootstrap';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';

const DNCIndex = (): JSX.Element => {
  const { currentUser } = useUserContext();
  const [dncs, setDncs] = useState<IDnc[]>([]);
  useEffect(() => {
    fetch(`${config.url.API_URL}/congregations/${currentUser!.congregation.id}/dncs`)
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        setDncs(d);
      });
  }, []);

  const rows = dncs.map((dnc) => {
    return (
      <tr key={dnc.id}>
        <td>{dnc.address}</td>
        <td>{dnc.territory.name}</td>
        <td>{dnc.date}</td>
      </tr>
    );
  });

  const dncHeaders = [
    { label: 'Address', key: 'address' },
    { label: 'Territory', key: 'territory.name' },
    { label: 'Date', key: 'date' },
  ];

  return (
    <div>
      <h3>All DNCs</h3>
      <CSVLink
        data={dncs}
        headers={dncHeaders}
        filename={`all-DNCs.csv`}
        className="btn btn-primary"
      >
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
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default DNCIndex;
