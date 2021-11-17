import {
  Box,
  Button,
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

const NewPublisher = (): JSX.Element => {
  const { currentUser } = useUserContext();
  const [name, setName] = useState('');
  const handleNameChange = (e: any) => {
    setName(e.currentTarget.value);
  };

  const [email, setEmail] = useState('');
  const handleEmailChange = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  const [role, setRole] = useState('Publisher');
  const handleRoleChange = (e: any) => {
    setRole(e.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const configObj = {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name,
          email,
          role,
        },
      }),
    };
    fetch(`${config.url.API_URL}/congregations/${currentUser!.congregation.id}/users`, configObj)
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
    <Box>
      <Typography variant="h1">Add Publisher</Typography>
      <form onSubmit={handleSubmit}>
        <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
          <TextField
            label="Publisher Name"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            helperText="Enter name as it will appear on territory records"
          />
          <TextField
            label="Publisher Email"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            helperText="Enter an email only if you would like to invite this publisher to create an account. Otherwise, leave it blank."
          />
        </Box>
        <hr />
        <Typography variant="h2">Role:</Typography>
        <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="role"
              defaultValue="t"
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
          <Button variant="contained" type="submit">
            Create Account
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewPublisher;
