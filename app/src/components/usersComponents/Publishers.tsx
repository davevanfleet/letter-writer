import React, { useEffect, useState } from 'react';
import { IUser } from '../../shared/interfaces';
import { Link as RouterLink } from 'react-router-dom';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const Publishers = (): JSX.Element => {
  const { currentUser } = useUserContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${config.url.API_URL}/congregations/${currentUser!.congregation.id}/users`)
      .then((r) => {
        if (!r.ok) {
          throw r;
        }
        return r.json();
      })
      .then((d) => {
        setUsers(d);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentUser!.congregation.id]);

  const userRows = users.map((user: IUser) => {
    return (
      <TableRow key={user.id}>
        <TableCell>
          <Link component={RouterLink} to={`/users/${user.id}`} underline="hover">
            {user.name}
          </Link>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.account_access || user.email ? user.role : 'No Account'}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Typography variant="h1">Manage Publishers</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{userRows}</TableBody>
        </Table>
      </TableContainer>
      <Link component={RouterLink} to="/users/new" underline="hover">
        Add Publisher
      </Link>
    </>
  );
};

export default Publishers;
