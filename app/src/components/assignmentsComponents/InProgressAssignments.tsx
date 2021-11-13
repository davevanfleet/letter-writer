import React from 'react';
import { useAssignmentsContext } from '../../contexts/AssignmentsContext';
import { IAssignment } from '../../shared/interfaces';
import AssignmentCard from './AssignmentCard';

const InProgressAssignments = (): JSX.Element => {
  const { inProgressAssignments } = useAssignmentsContext();
  return (
    <>
      {inProgressAssignments.map((assignment: IAssignment) => (
        <AssignmentCard assignment={assignment} />
      ))}
    </>
  );
};

export default InProgressAssignments;
