import { IUser } from '../../shared/interfaces';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import RecordBook from './RecordBook';

interface IRecordBookShowProps {
  currentUser: IUser;
}

const RecordBookShow = ({ currentUser }: IRecordBookShowProps): JSX.Element => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PDFViewer width="100%" height="100%">
      <RecordBook currentUser={currentUser} />
    </PDFViewer>
  </div>
);

export default RecordBookShow;
