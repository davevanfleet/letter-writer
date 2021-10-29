import { List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import React from 'react';

const Home = (): JSX.Element => (
  <>
    <Typography variant="h1">Territory Counter</Typography>
    <Box>
      <Typography>
        Welcome to Territory Counter, used to maintain congregation territories and do-not-calls.
      </Typography>
      <List>
        <ListItem>
          <Link to="/territories">View Territories</Link>
        </ListItem>
        <ListItem>
          <Link to="dncs">View/Maintain DNC List</Link>
        </ListItem>
      </List>
    </Box>
  </>
);

export default Home;
