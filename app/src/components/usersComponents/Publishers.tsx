import React, { useEffect, useState } from 'react';
import { IUser } from '../../shared/interfaces';
import { Link } from 'react-router-dom';
import { config } from '../../constants';
import { useUserContext } from '../../contexts/UserContext';
import {
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
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Typography variant="h1">Manage Publishers</Typography>
      <Typography>
        This page can be used to create new accounts or manage existing accounts for publishers in
        your congregation. Publishers with accounts can use them to access their territories online.
      </Typography>
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
      <Link to="/users/new">Add Publisher</Link>
    </>
  );
};

export default Publishers;
