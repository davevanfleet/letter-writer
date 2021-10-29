import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import RecordBook from './RecordBook';
import { useUserContext } from '../../contexts/UserContext';

const RecordBookShow = (): JSX.Element => {
  const { currentUser } = useUserContext();
  const today = new Date();
  const fileName = `${currentUser!.congregation.name} Territory ${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`;
  return (
    <Box>
      <Typography variant="h1">Download Records</Typography>
      <PDFDownloadLink
        document={<RecordBook congregationId={currentUser!.congregation.id} />}
        fileName={fileName}
      >
        {({ loading }) =>
          loading ? 'Loading document...' : <Button variant="contained">Download</Button>
        }
      </PDFDownloadLink>
    </Box>
  );
};

export default RecordBookShow;
