import { Typography } from '@mui/material';
import React from 'react';
import { useAssignmentsContext } from '../../contexts/AssignmentsContext';
import { IAssignment } from '../../shared/interfaces';
import AssignmentCard from './AssignmentCard';
import EmptyAssignments from './EmptyAssignments';

const Assignments = (): JSX.Element => {
  const { inProgressAssignments, completedAssignments } = useAssignmentsContext();
  return (
    <>
      <Typography>In-Progress Assignments</Typography>
      {inProgressAssignments.length > 0 ? (
        inProgressAssignments.map((assignment: IAssignment) => (
          <AssignmentCard assignment={assignment} />
        ))
      ) : (
        <EmptyAssignments />
      )}
      {completedAssignments.length > 0 && (
        <>
          <Typography>Completed Assignments</Typography>
          {completedAssignments.map((assignment: IAssignment) => (
            <AssignmentCard assignment={assignment} />
          ))}
        </>
      )}
    </>
  );
};

export default Assignments;
