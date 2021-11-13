import React from 'react';
import { useAssignmentsContext } from '../../contexts/AssignmentsContext';

const Assignments = (): JSX.Element => {
  const { inProgressAssignments, completedAssignments } = useAssignmentsContext();
  return <></>;
};

export default Assignments;
