import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';

interface ParamTypes {
  token: string;
}

const ConfirmNewUser = (): JSX.Element => {
  const { setCurrentUser } = useUserContext();
  const history = useHistory();
  const { token } = useParams<ParamTypes>();

  const [name, setName] = useState('');
  const handleNameChange = (e: any) => {
    setName(e.currentTarget.value);
  };

  const [email, setEmail] = useState('');
  const handleEmailChange = (e: any) => {
    setName(e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: any) => [setPassword(e.currentTarget.value)];

  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.currentTarget.value);
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
        user: {
          name,
          password,
          token,
        },
      }),
    };
    fetch(`${config.url.API_URL}/confirm`, configObj)
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        setCurrentUser(d);
        history.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box>
      <Typography variant="h1">Welcome to Territory Counter</Typography>
      <Typography>
        Thanks for confirming your email! We just need you to finish setting up your account, then
        you'll be ready to get started managing your territories.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
          <TextField
            label="Full Name"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            helperText="Enter your name as it will appear on territory records"
          />
          <TextField
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            label="Confirm Password"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button variant="contained" type="submit">
            Create Account
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ConfirmNewUser;
