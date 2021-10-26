import { IUser } from '../../shared/interfaces';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import RecordBook from './RecordBook';

const RecordBookShow = (): JSX.Element => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PDFViewer width="100%" height="100%">
      <RecordBook />
    </PDFViewer>
  </div>
);

export default RecordBookShow;
