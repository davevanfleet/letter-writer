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
  const [page, setPage] = useState(0);

  const { currentUser } = useUserContext();

  const [accountAccess, setAccountAccess] = useState(true);
  const handleAccountAccessChange = (e: any) => setAccountAccess((prevState) => !prevState);

  const [name, setName] = useState('');
  const handleNameChange = (e: any) => setName(e.currentTarget.value);

  const [email, setEmail] = useState('');
  const handleEmailChange = (e: any) => setEmail(e.currentTarget.value);

  const [role, setRole] = useState('Publisher');
  const handleRoleChange = (e: any) => setRole(e.currentTarget.value);

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
          account_access: accountAccess,
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

  switch (page) {
    case 0:
      return (
        <Box>
          <Typography variant="h1" gutterBottom>
            Add Publisher
          </Typography>
          <Typography variant="h2" gutterBottom>
            Send account invitation?
          </Typography>
          <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="account-access"
                defaultValue={true}
                name="accountAccess"
                value={accountAccess}
                onChange={handleAccountAccessChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  sx={{ textAlign: 'left' }}
                  label={
                    <>
                      <Typography variant="caption">
                        Yes - Publisher will receive an email invitation to create a personal
                        account where they can access territories assigned to them.
                      </Typography>
                    </>
                  }
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  sx={{ textAlign: 'left' }}
                  label={
                    <>
                      <Typography variant="caption">
                        No - No account will be created, but you will be able to list this
                        publisherin territory assignment records.
                      </Typography>
                    </>
                  }
                />
              </RadioGroup>
            </FormControl>
            <Button onClick={() => setPage(1)}>Next</Button>
          </Box>
        </Box>
      );
    case 1:
      return (
        <Box>
          <Typography variant="h1" gutterBottom>
            Add Publisher
          </Typography>
          <Typography variant="h2" gutterBottom>
            Publisher Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box ml="auto" mr="auto" display="flex" flexDirection="column" sx={{ maxWidth: 500 }}>
              <TextField
                label="Publisher Name"
                margin="normal"
                value={name}
                onChange={handleNameChange}
                helperText="Enter name as it will appear on territory records"
              />
              {accountAccess && (
                <TextField
                  label="Publisher Email"
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                  helperText="A confirmation email will be sent here, and this email address will serve as the publisher's login."
                />
              )}
            </Box>
            {accountAccess && (
              <>
                <hr />
                <Typography variant="h2">Role:</Typography>
                <Box
                  ml="auto"
                  mr="auto"
                  display="flex"
                  flexDirection="column"
                  sx={{ maxWidth: 500 }}
                >
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
                              can see all territories, make changes to records, and manage user
                              accounts
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
              </>
            )}
            <Button variant="contained" type="submit">
              Create Account
            </Button>
          </form>
        </Box>
      );
    default:
      return <></>;
  }
};

export default NewPublisher;
