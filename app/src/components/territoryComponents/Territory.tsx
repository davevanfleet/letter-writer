import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IAssignment, IContact, IDnc } from '../../shared/interfaces';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import CheckInDialog from './CheckInDialog';
import NewAssignmentDialog from './NewAssignmentDialog';
import UpdateAssignmentDialog from './UpdateAssignmentDialog';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';
import ContactsTable from '../shared/ContactsTable';

interface ITerritoryProps {
  refreshTerritory: () => void;
  territoryId: number;
  assignments: IAssignment[];
  contacts: IContact[];
  dncs: IDnc[];
  territoryName: string;
}

const Territory = ({
  territoryId,
  assignments,
  contacts,
  dncs,
  territoryName,
  refreshTerritory,
}: ITerritoryProps): JSX.Element => {
  const { currentUser } = useUserContext();
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
      `${config.url.API_URL}/congregations/${
        currentUser!.congregation.id
      }/territories/${territoryId}/assignments/${id}`,
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

  const assignmentRows = assignments.map((assignment) => (
    <TableRow key={assignment.id}>
      <TableCell>{assignment.user.name}</TableCell>
      <TableCell>{assignment.checked_out}</TableCell>
      <TableCell>
        {assignment.checked_in || (
          <Button
            onClick={() => {
              setAssignmentFocus(assignment);
              setDisplayCheckInModal(true);
            }}
          >
            Check In
          </Button>
        )}
      </TableCell>
      <TableCell>
        {assignment.checked_out && assignment.checked_in && (
          <Button
            onClick={() => {
              setAssignmentFocus(assignment);
              setDisplayUpdateModal(true);
            }}
          >
            Edit
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => {
            deleteAssignment(assignment.id);
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  const dncRows = dncs.map((dnc) => (
    <TableRow key={dnc.id}>
      <TableCell>{dnc.address}</TableCell>
      <TableCell>{dnc.date}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <Typography variant="h2">Assignments</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Publisher:</TableCell>
            <TableCell>Checked Out:</TableCell>
            <TableCell>Checked In:</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{assignmentRows}</TableBody>
      </Table>
      {(!assignments[assignments.length - 1] || assignments[assignments.length - 1].checked_in) && (
        <Button onClick={() => setDisplayAssignmentModal(true)}>Check Out</Button>
      )}

      <Typography variant="h2">DNCs</Typography>
      <CSVLink data={dncs} headers={dncHeaders} filename={`${territoryName}-DNCs.csv`}>
        <Button>Download DNCs</Button>
      </CSVLink>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dncRows}</TableBody>
      </Table>

      <Typography variant="h2">Contacts</Typography>
      <Typography>{contacts.length} contacts loaded</Typography>
      <CSVLink data={contacts} headers={headers} filename={`${territoryName}.csv`}>
        <Button>Download Territory</Button>
      </CSVLink>
      <ContactsTable contacts={contacts} />
      <br />
      <NewAssignmentDialog
        congregationId={currentUser!.congregation.id}
        territoryId={territoryId}
        handleClose={handleCloseModals}
        open={displayAssignmentModal}
      />
      {assignmentFocus && (
        <>
          <CheckInDialog
            congregationId={currentUser!.congregation.id}
            territoryId={territoryId}
            assignment={assignmentFocus}
            handleClose={handleCloseModals}
            open={displayCheckInModal}
          />
          <UpdateAssignmentDialog
            congregationId={currentUser!.congregation.id}
            territoryId={territoryId}
            assignment={assignmentFocus}
            handleClose={handleCloseModals}
            open={displayUpdateModal}
          />
        </>
      )}
    </>
  );
};

export default Territory;
