import { Card, CardActionArea, CardContent, CardHeader, Typography, useTheme } from '@mui/material';
import React from 'react';
import { IAssignment } from '../../shared/interfaces';
import { useHistory } from 'react-router';

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
    color = theme.palette.background.paper;
  } else if (dateDiff < 90) {
    color = theme.palette.warning.main;
  } else {
    color = theme.palette.warning.main;
  }
  const history = useHistory();
  return (
    <Card
      sx={{
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 4,
        backgroundColor: color,
      }}
    >
      <CardActionArea onClick={() => history.push(`/assignments/${assignment.id}`)}>
        <CardHeader title={assignment.territory.name} />
        <CardContent>
          <Typography variant="caption">
            Checked out {new Date(assignment.checked_out).toLocaleDateString()} ({dateDiff} days
            ago)
          </Typography>
          <Typography>{assignment.checked_in}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AssignmentCard;
