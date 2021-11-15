import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { config } from '../../constants';
import { IAssignment } from '../../shared/interfaces';
import ContactsTable from '../shared/ContactsTable';

const Assignment = (): JSX.Element => {
  const [assignment, setAssignment] = useState<IAssignment | undefined>();
  const { id } = useParams<Record<string, string | undefined>>();
  useEffect(() => {
    fetch(`${config.url.API_URL}/assignments/${id}`)
      .then((r) => {
        if (!r.ok) throw r;
        return r.json();
      })
      .then((d) => {
        setAssignment(d);
      });
  }, [id]);

  const isComplete = !!assignment?.checked_in;
  const dateDiff =
    assignment &&
    Math.floor(
      (new Date().getTime() - new Date(assignment.checked_out).getTime()) / (1000 * 3600 * 24),
    );

  return assignment ? (
    <Box>
      <Typography variant="h1">Assignment</Typography>
      <Typography variant="subtitle1">{assignment.territory.name}</Typography>
      <Typography>
        {isComplete
          ? `Completed ${new Date(assignment.checked_in!).toLocaleDateString()}`
          : `Checked out ${new Date(
              assignment.checked_out,
            ).toLocaleDateString()} (${dateDiff} days ago)`}
      </Typography>
      {!isComplete && <ContactsTable contacts={assignment.contacts} />}
    </Box>
  ) : (
    <></>
  );
};

export default Assignment;
