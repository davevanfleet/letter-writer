import { Card } from '@material-ui/core';
import { CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';

const EmptyAssignments = (): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">No Territory Assignments Right Now</Typography>
        <Typography>Request a territory from the Territory Servant</Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyAssignments;
