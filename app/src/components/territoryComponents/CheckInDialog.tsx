import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { config } from '../../constants';
import { IAssignment } from '../../shared/interfaces';
import { Link } from 'react-router-dom';

interface ICheckInModalProps {
  assignment: IAssignment;
  congregationId: number;
  territoryId: number;
  handleClose: () => void;
  open: boolean;
}

const CheckInModal = ({
  assignment,
  congregationId,
  territoryId,
  handleClose,
  open,
}: ICheckInModalProps): JSX.Element => {
  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  const handleCheckInChange = (newValue: Date | null) => {
    setCheckIn(newValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        assignment: {
          ...assignment,
          checked_in: checkIn,
        },
      }),
    };
    fetch(
      `${config.url.API_URL}/congregations/${congregationId}/territories/${territoryId}/assignments/${assignment.id}`,
      configObj,
    )
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Check-in Territory</DialogTitle>
      <DialogContent>
        <DialogContentText>Please select a check-in date.</DialogContentText>
        <Box display="flex" flexDirection="column" p={2}>
          <Box my={2}>
            <Typography variant="body2">Publisher: {assignment.user.name}</Typography>
          </Box>
          <Box my={2}>
            <Typography variant="body2">Checked Out: {assignment.checked_out}</Typography>
          </Box>
          <Box mt={2}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Checkout Date"
                inputFormat="MM/DD/yyyy"
                value={checkIn}
                onChange={handleCheckInChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Button onClick={handleSubmit}>Check In</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckInModal;
