import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { IAssignment, IUser } from '../../shared/interfaces';
import { config } from '../../constants';
import { usePublishersContext } from '../../contexts/PublishersContext';

interface IUpdateAssignmentModal {
  assignment: IAssignment;
  congregationId: number;
  territoryId: number;
  handleClose: () => void;
  open: boolean;
}

const UpdateAssignmentModal = ({
  assignment,
  congregationId,
  territoryId,
  handleClose,
  open,
}: IUpdateAssignmentModal): JSX.Element => {
  const { publishers } = usePublishersContext();
  const [publisherId, setPublisherId] = useState(assignment.user.id);
  const handlePublisherIdChange = (e: any) => {
    setPublisherId(e.currentTarget.value);
  };

  const [checkOut, setCheckOut] = useState<Date | null>(new Date(assignment.checked_out));
  const handleCheckOutChange = (newValue: Date | null) => {
    setCheckOut(newValue);
  };

  const [checkIn, setCheckIn] = useState<Date | null>(new Date(assignment.checked_in!));
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
          publisher_id: publisherId,
          checked_out: checkOut,
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
      <DialogTitle>Checkout Territory</DialogTitle>
      <DialogContent>
        <DialogContentText>Please select a publisher and check-out date.</DialogContentText>
        <Box display="flex" flexDirection="column" p={2}>
          <Box mb={5}>
            <TextField
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              name="publisherId"
              label="Select Publisher"
              onChange={handlePublisherIdChange}
              value={publisherId}
            >
              <option key={0} value="0"></option>
              {publishers.map((publisher: IUser) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </TextField>
          </Box>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Checkout Date"
                inputFormat="MM/DD/yyyy"
                value={checkOut}
                onChange={handleCheckOutChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Checkin Date"
                inputFormat="MM/DD/yyyy"
                value={checkIn}
                onChange={handleCheckInChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssignmentModal;
