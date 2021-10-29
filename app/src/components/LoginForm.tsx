import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { useUserContext } from '../contexts/UserContext';

const LoginForm = (): JSX.Element => {
  const { login } = useUserContext();
  const [username, setUsername] = useState('');
  const handleUsernameChange = (e: any) => {
    setUsername(e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <>
      <Typography variant="h1">Login</Typography>
      <form onSubmit={handleLogin}>
        <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
          <TextField
            label="Username"
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
