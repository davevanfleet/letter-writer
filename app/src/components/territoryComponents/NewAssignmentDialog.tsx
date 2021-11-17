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
import { usePublishersContext } from '../../contexts/PublishersContext';
import { IUser } from '../../shared/interfaces';
import { Link } from 'react-router-dom';

interface INewAssignmentModalProps {
  handleClose: () => void;
  open: boolean;
  congregationId: number;
  territoryId: number;
}

const NewAssignmentModal = ({
  congregationId,
  territoryId,
  handleClose,
  open,
}: INewAssignmentModalProps): JSX.Element => {
  const { publishers } = usePublishersContext();
  const [publisherId, setPublisherId] = useState(0);
  const handlePublisherIdChange = (e: any) => {
    setPublisherId(e.currentTarget.value);
  };

  const [checkOut, setCheckOut] = useState<Date | null>(new Date());
  const handleCheckOutChange = (newValue: Date | null) => {
    setCheckOut(newValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        assignment: {
          publisher_id: publisherId,
          checked_out: checkOut,
        },
      }),
    };
    fetch(
      `${config.url.API_URL}/congregations/${congregationId}/territories/${territoryId}/assignments`,
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
      <DialogTitle>Check-out Territory</DialogTitle>
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
            <DesktopDatePicker
              label="Checkout Date"
              inputFormat="MM/DD/yyyy"
              value={checkOut}
              onChange={handleCheckOutChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Button onClick={handleSubmit}>Check Out</Button>
        <Box>
          <Typography variant="caption">
            Don&apos;t see the publisher you&apos;re looking for? Add him/her{' '}
            <Link to="/users/new">here</Link> first.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewAssignmentModal;
