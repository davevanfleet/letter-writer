import { IDnc, ITerritory, IUser } from '../../shared/interfaces';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { config } from '../../constants';

interface IDNCListProps {
  allDncs: IDnc[];
  sortedTerritories: ITerritory[];
  territoryId: number;
  currentUser: IUser;
  handleEditClick: (e: any, dnc: IDnc) => void;
  handleTerritoryChange: (e: any) => void;
}

const DNCList = ({
  allDncs,
  sortedTerritories,
  territoryId,
  currentUser,
  handleEditClick,
  handleTerritoryChange,
}: IDNCListProps): JSX.Element => {
  // const [query, setQuery] = useState('0')
  // const handleQueryChange = (e) => {
  //     setQuery(e.target.value)
  // }

  const [addresses, setAddresses] = useState<IDnc[]>([]);
  useEffect(() => {
    setAddresses(allDncs.filter((dnc) => dnc.territory_id === territoryId));
  }, [territoryId, allDncs]);

  const handleDeleteClick = (e: any, id: number) => {
    e.preventDefault();
    if (window.confirm('Are You sure you want to delete this do-not-call?')) {
      const configObj = {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          accepts: 'aplication/json',
        },
      };
      fetch(
        `${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories/${territoryId}/dncs/${id}`,
        configObj,
      )
        .then((r) => r.json())
        .then((d) => {
          setAddresses(addresses.filter((address) => address.id !== id));
        });
    }
  };

  const rows = addresses.map((dnc) => {
    return (
      <tr key={dnc.id}>
        <td>{dnc.address}</td>
        <td>{dnc.name}</td>
        <td>{dnc.publisher}</td>
        <td>{dnc.date}</td>
        <td>{dnc.description}</td>
        <td>
          <button className="btn btn-warning" onClick={(e) => handleEditClick(e, dnc)}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={(e) => handleDeleteClick(e, dnc.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h3>Do-Not-Calls by Territory</h3>
      <p>
        Territory:{' '}
        <select name="territory" onChange={(e) => handleTerritoryChange(e)} value={territoryId}>
          <option key={0} value="0">
            Select a Territory
          </option>
          {sortedTerritories.map((t: ITerritory) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </p>

      <Table responsive>
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
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default DNCList;
