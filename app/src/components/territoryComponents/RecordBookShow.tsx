import React, { useContext } from 'react';
import { Box } from '@mui/system';
import { PDFViewer } from '@react-pdf/renderer';
import RecordBook from './RecordBook';
import UserContext from '../../contexts/UserContext';

const RecordBookShow = (): JSX.Element => {
  const { currentUser } = useContext(UserContext);
  return (
    <Box width="100vw" height="100vh">
      <PDFViewer width="100%" height="100%">
        <RecordBook congregationId={currentUser!.congregation.id} />
      </PDFViewer>
    </Box>
  );
};

export default RecordBookShow;
