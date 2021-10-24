import { IAssignment, IContact, IDnc, IUser } from '../../shared/interfaces';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import CheckBox from '../CheckBox';
import CheckInModal from './CheckInModal';
import NewAssignmentModal from './NewAssignmentModal';
import Table from 'react-bootstrap/Table';
import UpdateAssignmentModal from './UpdateAssignmentModal';
import { config } from '../../constants';

interface ITerritoryProps {
  refreshTerritory: () => void;
  currentUser: IUser;
  territoryId: number;
  assignments: IAssignment[];
  contacts: IContact[];
  dncs: IDnc[];
  territoryName: string;
}

const Territory = ({
  currentUser,
  territoryId,
  assignments,
  contacts,
  dncs,
  territoryName,
  refreshTerritory,
}: ITerritoryProps): JSX.Element => {
  const [displayAssignmentModal, setDisplayAssignmentModal] = useState(false);
  const [displayCheckInModal, setDisplayCheckInModal] = useState(false);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);
  const [assignmentFocus, setAssignmentFocus] = useState<IAssignment | undefined>();

  const handleCloseModals = () => {
    setDisplayAssignmentModal(false);
    setDisplayCheckInModal(false);
    setDisplayUpdateModal(false);
    refreshTerritory();
  };

  const deleteAssignment = (id: number) => {
    const configObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
    };
    fetch(
      `${config.url.API_URL}/congregations/${currentUser.congregation.id}/territories/${territoryId}/assignments/${id}`,
      configObj,
    )
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        console.log('in delete');
        refreshTerritory();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Address', key: 'address' },
    { label: 'Phone', key: 'phone' },
    { label: 'Phone Type', key: 'phone_type' },
    { label: 'Primary Language', key: 'lang' },
    { label: 'Check When Finished', key: 'blank' },
  ];

  const dncHeaders = [
    { label: 'Address', key: 'address' },
    { label: 'Date', key: 'date' },
  ];

  const assignmentRows = assignments.map((assignment) => {
    return (
      <tr key={assignment.id}>
        <td>{assignment.publisher}</td>
        <td>{assignment.checked_out}</td>
        <td>
          {assignment.checked_in || (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setAssignmentFocus(assignment);
                setDisplayCheckInModal(true);
              }}
            >
              Check In
            </button>
          )}
        </td>
        <td>
          {assignment.checked_out && assignment.checked_in && (
            <button
              className="btn btn-warning"
              onClick={() => {
                setAssignmentFocus(assignment);
                setDisplayUpdateModal(true);
              }}
            >
              Edit
            </button>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteAssignment(assignment.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const contactRows = contacts.map((contact) => (
    <tr key={contact.id}>
      <td>{contact.name}</td>
      <td>{contact.address}</td>
      <td>{contact.phone}</td>
      <td>{contact.phone_type}</td>
      <td>{contact.lang && config.languageMapping[contact.lang]}</td>
      <CheckBox id={contact.id} />
    </tr>
  ));
  const dncRows = dncs.map((dnc) => (
    <tr key={dnc.id}>
      <td>{dnc.address}</td>
      <td>{dnc.date}</td>
    </tr>
  ));
  return (
    <div>
      <h2>Assignments</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Publisher:</th>
            <th>Checked Out:</th>
            <th>Checked In:</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{assignmentRows}</tbody>
      </Table>
      {(!assignments[assignments.length - 1] || assignments[assignments.length - 1].checked_in) && (
        <button className="btn btn-primary" onClick={() => setDisplayAssignmentModal(true)}>
          Check Out
        </button>
      )}

      <h2>DNCs</h2>
      <CSVLink
        data={dncs}
        headers={dncHeaders}
        filename={`${territoryName}-DNCs.csv`}
        className="btn btn-primary"
      >
        Download DNCs
      </CSVLink>
      <Table responsive>
        <thead>
          <tr>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{dncRows}</tbody>
      </Table>
      <h2>Contacts</h2>
      <p>{contacts.length} contacts loaded</p>
      <CSVLink
        data={contacts}
        headers={headers}
        filename={`${territoryName}.csv`}
        className="btn btn-primary"
      >
        Download Territory
      </CSVLink>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Phone Type</th>
            <th>Primary Language</th>
            <th>Check When Done</th>
          </tr>
        </thead>
        <tbody>{contactRows}</tbody>
      </Table>
      <br />
      {displayAssignmentModal && (
        <NewAssignmentModal
          congregationId={currentUser.congregation.id}
          territoryId={territoryId}
          handleClose={handleCloseModals}
        />
      )}
      {displayCheckInModal && assignmentFocus && (
        <CheckInModal
          congregationId={currentUser.congregation.id}
          territoryId={territoryId}
          assignment={assignmentFocus}
          handleClose={handleCloseModals}
        />
      )}
      {displayUpdateModal && assignmentFocus && (
        <UpdateAssignmentModal
          congregationId={currentUser.congregation.id}
          territoryId={territoryId}
          assignment={assignmentFocus}
          handleClose={handleCloseModals}
        />
      )}
    </div>
  );
};

export default Territory;
