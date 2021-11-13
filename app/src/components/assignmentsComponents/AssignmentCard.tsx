import { Card, CardHeader, Typography, useTheme } from '@mui/material';
import React from 'react';
import { IAssignment } from '../../shared/interfaces';

interface IAssignmentCardProps {
  assignment: IAssignment;
}

const AssignmentCard = ({ assignment }: IAssignmentCardProps): JSX.Element => {
  const theme = useTheme();
  const dateDiff = Math.floor(
    (new Date().getTime() - new Date(assignment.checked_out).getTime()) / (1000 * 3600 * 24),
  );
  let color;
  if (dateDiff < 45) {
    color = theme.palette.grey['100'];
  } else if (dateDiff < 90) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.warning.main;
  }
  return (
    <Card
      sx={{
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 4,
        paddingBottom: 2,
        backgroundColor: color,
      }}
    >
      <CardHeader title={assignment.territory.name} />
      <Typography variant="caption">
        Checked out {new Date(assignment.checked_out).toLocaleDateString()} ({dateDiff} days ago)
      </Typography>
      <Typography>{assignment.checked_in}</Typography>
    </Card>
  );
};

export default AssignmentCard;
