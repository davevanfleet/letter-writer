import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';
import { IUser } from '../../shared/interfaces';

interface IUpdatePublisherProps {
  publisher: IUser;
  open: boolean;
  handleClose: () => void;
}

const UpdatePublisher = ({ publisher, open, handleClose }: IUpdatePublisherProps): JSX.Element => {
  const { currentUser } = useUserContext();

  const [name, setName] = useState(publisher.name);
  const handleNameChange = (e: any) => setName(e.currentTarget.value);

  const [role, setRole] = useState(publisher.role);
  const handleRoleChange = (e: any) => setRole(e.currentTarget.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'PUT',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name,
          email: publisher.email,
          role,
          account_access: publisher.account_access,
        },
      }),
    };
    fetch(
      `${config.url.API_URL}/congregations/${currentUser!.congregation.id}/users/${publisher.id}`,
      configObj,
    )
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Publisher</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Publisher Name"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            helperText="Enter name as it will appear on territory records"
          />
          <Typography variant="subtitle2">Role:</Typography>
          <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="role"
                defaultValue={publisher.role}
                name="api-access"
                value={role}
                onChange={handleRoleChange}
              >
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  sx={{ textAlign: 'left' }}
                  label={
                    <>
                      <Typography>Admin</Typography>
                      <Typography variant="caption">
                        can see all territories, make changes to records, and manage user accounts
                      </Typography>
                    </>
                  }
                />
                <FormControlLabel
                  value="Publisher"
                  control={<Radio />}
                  sx={{ textAlign: 'left' }}
                  label={
                    <>
                      <Typography>Publisher</Typography>
                      <Typography variant="caption">
                        can only see their assigned territories
                      </Typography>
                    </>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button type="submit">Update Publisher</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePublisher;
