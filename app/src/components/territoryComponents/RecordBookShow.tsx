import { Box } from '@mui/system';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import RecordBook from './RecordBook';
import { useUserContext } from '../../contexts/UserContext';

const RecordBookShow = (): JSX.Element => {
  const { currentUser } = useUserContext();
  return (
    <Box width="100vw" height="100vh">
      <PDFViewer width="100%" height="100%">
        <RecordBook congregationId={currentUser!.congregation.id} />
      </PDFViewer>
    </Box>
  );
};

export default RecordBookShow;
